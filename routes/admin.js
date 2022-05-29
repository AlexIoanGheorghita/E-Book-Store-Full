const router = require('express').Router();
const { BlobServiceClient, BlockBlobClient, BlobSASPermissions, StorageSharedKeyCredential, generateBlobSASQueryParameters } = require('@azure/storage-blob');
const { bubbleSort, binarySearch } = require('../auth/binarySearch');
const { verifyAdmin, validateAdminProductUpload, validateAdminNewProductUpload } = require('../auth/utilities');
const db = require('../pool_connection/connect');
const getStream = require('into-stream');

router.get('/products/existing/:category', verifyAdmin, (req, res) => {
    if (req.params.category === 'all') {
        db.query(`WITH product_categories AS (
                    SELECT p.product_id, string_agg(c.cat_name, ', ') AS category_names
                    FROM products AS p
                    JOIN products_categories_junction AS pc ON p.product_id = pc.product_id
                    JOIN categories AS c ON pc.category_id = c.category_id
                    WHERE c.parent_cat_id IS NOT NULL
                    GROUP BY p.product_id
                ), product_details AS (
                    SELECT 
                        p.product_id, 
                        p.title, 
                        p.description, 
                        p.price, 
                        p.publisher, 
                        p.date_published,
                        p.thumbnail_url, 
                        p.document_url,
                        p.language,
                        p.num_pages,
                        p.isbn,
                        p.status_id,
                        string_agg(a.author_name, ', ') AS authors,
                        string_agg(a.author_id::character varying, ', ') AS author_ids,
                        string_agg(a.user_id::character varying, ', ') AS user_author_ids
                    FROM products AS p
                    JOIN products_authors_junction AS pa ON p.product_id = pa.product_id
                    JOIN authors AS a ON a.author_id = pa.author_id
                    WHERE p.status_id = 1
                    GROUP BY p.product_id
                    ORDER BY p.product_id
                )
                
                SELECT 
                p.product_id,
                    p.title, 
                    p.description, 
                    p.price, 
                    p.publisher, 
                    p.date_published,
                    p.thumbnail_url, 
                    p.document_url,
                    p.language,
                    p.num_pages,
                    p.isbn,
                    p.status_id,
                    p.authors,
                    p.author_ids,
                    p.user_author_ids,
                    pc.category_names 
                FROM product_categories AS pc 
                JOIN product_details AS p ON pc.product_id = p.product_id`, (err, results) => {
            if (err) {
                res.status(404).send(`Error: ${err.message}. Other details: ${err.name} - ${err.stack}`);
            } else {
                res.status(200).json(results.rows);
            }
        });
    } else {
        db.query(`WITH product_categories AS (
            SELECT p.product_id, string_agg(c.cat_name, ', ') AS category_names
            FROM products AS p
            JOIN products_categories_junction AS pc ON p.product_id = pc.product_id
            JOIN categories AS c ON pc.category_id = c.category_id
            WHERE c.parent_cat_id IS NOT NULL
            GROUP BY p.product_id
        ), product_details AS (
            SELECT 
                p.product_id, 
                p.title, 
                p.description, 
                p.price, 
                p.publisher, 
                p.date_published,
                p.thumbnail_url, 
                p.document_url,
                p.language,
                p.num_pages,
                p.isbn,
                p.status_id,
                string_agg(a.author_name, ', ') AS authors,
                string_agg(a.author_id::character varying, ', ') AS author_ids,
                string_agg(a.user_id::character varying, ', ') AS user_author_ids
            FROM products AS p
            JOIN products_authors_junction AS pa ON p.product_id = pa.product_id
            JOIN authors AS a ON a.author_id = pa.author_id
            WHERE p.status_id = 1
            GROUP BY p.product_id
            ORDER BY p.product_id
        )
        
        SELECT 
        p.product_id,
            p.title, 
            p.description, 
            p.price, 
            p.publisher, 
            p.date_published,
            p.thumbnail_url, 
            p.document_url,
            p.language,
            p.num_pages,
            p.isbn,
            p.status_id,
            p.authors,
            p.author_ids,
            p.user_author_ids,
            pc.category_names 
        FROM product_categories AS pc 
        JOIN product_details AS p ON pc.product_id = p.product_id
        WHERE pc.category_names LIKE ('%${req.params.category}%')`, (err, results) => {
            if (err) {
                res.status(404).send(`Error: ${err.message}. Other details: ${err.name} - ${err.stack}`);
            } else {
                res.status(200).json(results.rows);
            }
        });
    }
});

router.put('/products/:productId', verifyAdmin, (req, res) => {
    const { category, subcategory } = req.body;

    db.query(`
        UPDATE products 
        SET status_id = 1
        WHERE product_id = ${req.params.productId}
    `, (err, results) => {
        if (err) {
            res.status(500).json('Could not update record');
        } else {
            db.query(`
                INSERT INTO products_categories_junction (product_id, category_id)
                VALUES (${req.params.productId}, ${category}),
                VALUES (${req.params.productId}, ${subcategory})
            `, (err, result) => {
                if (err) {
                    res.status(500).json('Could not introduce new records');
                } else {
                    res.status(200).json(`Successfully added product to categories: ${category}, ${subcategory}`);
                }
            });
        }
    }); 
});

router.get('/products/awaiting', verifyAdmin, (req, res) => {
    db.query(`SELECT * 
        FROM products AS p
        JOIN products_authors_junction AS pa ON p.product_id = pa.product_id
        JOIN authors AS a ON a.author_id = pa.author_id
        WHERE p.status_id = 0`, (err, results) => {
        if (err) {
            res.status(404).send(`Error: ${err.message}. Other details: ${err.name} - ${err.stack}`);
        } else {
            res.status(200).json(results.rows);
        }
    });
});

router.get('/products/awaiting/:productId/document', verifyAdmin, (req, res) => {
    db.query(`
        SELECT document_url
        FROM products
        WHERE product_id = ${req.params.productId} AND status_id = 0
    `, (err, results) => {
        if (err) {
            res.status(404).send(`Document not found`);
        } else {
            const data = results.rows[0];

            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING);
            const containerClientDocuments = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME_TWO);
            const blobNameDocument = formatName(data.document_url);
            const blockBlobDocClient = containerClientDocuments.getBlockBlobClient(blobNameDocument);

            // Adding reading permission for a limited amount of time
            const permissions = new BlobSASPermissions();
            permissions.read = true;
            const currentDateTime = new Date();
            const expireDateTime = new Date(currentDateTime.setMinutes(currentDateTime.getMinutes() + 5));
            const blobSASModel = {
                containerName: process.env.CONTAINER_NAME_TWO,
                blobName: blobNameDocument,
                permissions,
                expiresOn: expireDateTime
            };

            // Create Shared Access Signature (so that anonymous access is set to read-only)
            const sharedAccessCredentials = new StorageSharedKeyCredential(process.env.ACCOUNT_NAME, process.env.ACCOUNT_KEY);
            const SAStoken = generateBlobSASQueryParameters(blobSASModel, sharedAccessCredentials);
            const blobURL = blockBlobDocClient.url + '?' + SAStoken; // URL that we will use

            res.status(201).json({ blobURL });
        }
    })
});

router.get('/products/awaiting/:productId/thumbnail', verifyAdmin, (req, res) => {
    db.query(`
        SELECT thumbnail_url
        FROM products
        WHERE product_id = ${req.params.productId} AND status_id = 0
    `, (err, results) => {
        if (err) {
            res.status(404).send(`Thumbnail not found`);
        } else {
            const data = results.rows[0];

            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING);
            const containerClientThumbnails = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME_ONE);
            const blobNameThumbnail = formatName(data.thumbnail_url);
            const blockBlobThumbClient = containerClientThumbnails.getBlockBlobClient(blobNameThumbnail);

            res.status(201).json({ blobURL: blockBlobThumbClient.url });
        }
    })
});

router.delete('/products/awaiting/:productId', verifyAdmin, (req, res) => {
    db.query(`SELECT * 
        FROM products AS p
        JOIN products_authors_junction AS pa ON p.product_id = pa.product_id
        JOIN authors AS a ON a.author_id = pa.author_id
        WHERE p.status_id = 0 AND p.product_id = ${req.params.productId}`, (err, results) => {
        if (err) {
            res.status(404).send(`Error: ${err.message}. Other details: ${err.name} - ${err.stack}`);
        } else {
            const data = results.rows[0];

            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING);
            const containerClientThumbnails = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME_ONE);
            const containerClientDocuments = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME_TWO);
            const blobNameThumbnail = formatName(data.thumbnail_url);
            const blobNameDocument = formatName(data.document_url);

            const blockBlobThumbClient = containerClientThumbnails.getBlockBlobClient(blobNameThumbnail);
            const blockBlobDocClient = containerClientDocuments.getBlockBlobClient(blobNameDocument);

            blockBlobThumbClient.delete().then(() => console.log('Successfully deleted')).catch(() => console.log('Unable to delete'));
            blockBlobDocClient.delete().then(() => console.log('Successfully deleted')).catch(() => console.log('Unable to delete'));

            db.query(`
                DELETE FROM products WHERE product_id = ${req.params.productId}
            `, (err, results) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(`Error: ${err.message}. Other details: ${err.name} - ${err.stack}`);
                } else {

                    db.query(`DELETE FROM authors WHERE user_id = ${data.user_id}`, (err, results) => {
                        if (err) {
                            res.status(500).json('An error occured');
                        } else {
                            res.status(203).send('Successfully deleted');
                        }
                    });   
                }
            });
        }
    });
});

router.put('/products/existing/:productId', validateAdminProductUpload, verifyAdmin, (req, res) => {
    const { document, thumbnail, title, author, summary, pages, language, isbn, price, publisher, date, documentName, thumbnailName } = req.details;

    db.query(`
        SELECT pa.product_id, string_agg(a.author_id::character varying, ', ') AS ids, string_agg(a.author_name, ', ') AS names
        FROM authors AS a
        JOIN products_authors_junction AS pa 
        ON a.author_id = pa.author_id
        WHERE pa.product_id = ${req.params.productId}
        GROUP BY pa.product_id`, (err, results) => {
        if (err) {
            return res.status(404).send('Authors for selected product not found');
        } else {
            const { names } = results.rows[0];
            const originalNamesArr = names.split(',');
            const newNamesArr = author.split(',');

            const authorsToDelete = [];
            const authorsToAdd = [];

            originalNamesArr.forEach(elem => {
                if (!newNamesArr.includes(elem.trim())) {
                    authorsToDelete.push(elem.trim());
                    console.log(elem + ' is an old author');
                }
            });

            newNamesArr.forEach(elem => {
                if (!originalNamesArr.includes(elem.trim())) {
                    authorsToAdd.push(elem.trim());
                    console.log(elem + ' is a new author');
                }
            });

            console.log(authorsToDelete);
            console.log(authorsToAdd);

            authorsToDelete.forEach(elem => {
                db.query(`
                    SELECT a.author_id, a.author_name, COUNT(pa.product_id) AS products
                    FROM authors AS a
                    JOIN products_authors_junction AS pa
                    ON a.author_id = pa.author_id
                    WHERE a.author_name = '${elem}'
                    GROUP BY a.author_id;
                `, (err, results) => {
                    if (err) {
                        console.log('Author does not exist');
                    } else {
                        const authorData = results.rows[0];
                        if (authorData.products === 0) {
                            db.query(`
                                DELETE FROM authors
                                WHERE author_id = ${authorData.author_id}
                            `, (err, results) => {
                                if (err) {
                                    console.log('Could not delete author');
                                } else {
                                    db.query(`
                                        DELETE FROM products_authors_junction
                                        WHERE author_id = ${authorData.author_id} AND product_id = ${req.params.productId}
                                    `, (err, results) => {
                                        if (err) {
                                            console.log('Could not delete author-product record');
                                        } else {
                                            console.log('Successfully deleted author ' + authorData.author_name);
                                        }
                                    });
                                }
                            });
                        } else {
                            db.query(`
                                DELETE FROM products_authors_junction
                                WHERE author_id = ${authorData.author_id} AND product_id = ${req.params.productId}
                            `, (err, results) => {
                                if (err) {
                                    console.log('Could not delete author-product record');
                                } else {
                                    console.log('Successfully deleted author ' + authorData.author_name);
                                }
                            });
                        }
                    }
                });
            });

            authorsToAdd.forEach(elem => {
                db.query(`
                    SELECT a.author_id, a.author_name, COUNT(pa.product_id) AS products
                    FROM authors AS a
                    JOIN products_authors_junction AS pa
                    ON a.author_id = pa.author_id
                    WHERE a.author_name = '${elem}'
                    GROUP BY a.author_id;
                `, (err, results) => {
                    if (err) {
                        console.log('Author does not exist');
                    } else {
                        const authorData = results.rows[0];
                        if (authorData === undefined) {
                            db.query(`
                                INSERT INTO authors (author_name, user_id)
                                VALUES('${elem}', null) RETURNING *
                            `, (err, resAuth) => {
                                if (err) {
                                    console.log('Author could not be created');
                                } else {
                                    const newAuthorData = resAuth.rows[0];
                                    db.query(`
                                        INSERT INTO products_authors_junction (product_id, author_id)
                                        VALUES(${req.params.productId}, ${newAuthorData.author_id})
                                    `, (err, results) => {
                                        if (err) {
                                            console.log('Product-author relationship could not be created');
                                        } else {
                                            console.log('Successfully added author ' + newAuthorData.author_name);
                                        }
                                    });
                                }
                            });
                        } else {
                            db.query(`
                                INSERT INTO products_authors_junction (product_id, author_id)
                                VALUES(${req.params.productId}, ${authorData.author_id})
                            `, (err, results) => {
                                if (err) {
                                    console.log('Product-author relationship could not be created');
                                } else {
                                    console.log('Successfully added author ' + authorData.author_name);
                                }
                            });
                        }
                    }
                });
            });
        }
    });

    if (documentName && thumbnailName) {
        db.query(`
            SELECT document_url, thumbnail_url
            FROM products
            WHERE product_id = ${req.params.productId}
        `, (err, results) => {
            if (err) {
                return res.status(404).json('Could not find details for specified product');
            } else {
                const { document_url, thumbnail_url } = results.rows[0];
                if (documentName === document_url && thumbnailName === thumbnail_url) {
                    db.query(`
                        UPDATE products
                        SET 
                            title = '${title}',
                            description = '${summary}',
                            num_pages = ${pages},
                            language = '${language}',
                            isbn = '${isbn}',
                            price = ${price},
                            publisher = '${publisher}',
                            date_published = ${date}
                        WHERE product_id = ${req.params.productId}
                    `, (err, results) => {
                        if (err) {
                            return res.status(500).send(`Could not update product`);
                        } else {
                            return res.status(202).json('Successfully updated the product!');
                        }
                    }); 
                } else {
                    // We need to add the new document and cover page to Azure and delete the old ones
                    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING);
                    if (documentName !== document_url) {
                        const clientContainerDocuments = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME_TWO);

                        let blobDocName = formatFileName(document.name);
                        const blobDocService = new BlockBlobClient(process.env.CONNECTION_STRING, process.env.CONTAINER_NAME_TWO, blobDocName + '.pdf');
                        const blobDocStream = getStream(document.data);
                        const blobDocStreamSize = document.size;

                        blobDocService.uploadStream(blobDocStream, blobDocStreamSize)
                        .then((result) => {
                            const blockBlobDocClient = clientContainerDocuments.getBlockBlobClient(blobDocName + '.pdf');
                            const blobNameDocumentOld = formatName(document_url);
                            const blockBlobDocClientOld = clientContainerDocuments.getBlockBlobClient(blobNameDocumentOld);

                            blockBlobDocClientOld.delete().then(() => console.log('Successfully deleted old document')).catch(() => console.log('Unable to delete old document'));

                            db.query(`
                                UPDATE products
                                SET 
                                    document_url = '${blockBlobDocClient.url}'
                                WHERE product_id = ${req.params.productId}
                            `, (err, results) => {
                                if (err) {
                                    return res.status(500).json('Unable to update document and thumbnail URLs');
                                }
                            });
                        }).catch((err) => {
                            console.log(err);
                        });
                    }

                    if (thumbnailName !== thumbnail_url) {
                        const clientContainerThumbnails = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME_ONE);

                        let blobName = formatFileName(thumbnail.name);
                        const blobService = new BlockBlobClient(process.env.CONNECTION_STRING, process.env.CONTAINER_NAME_ONE, blobName + '.jpg');
                        const blobStream = getStream(thumbnail.data);
                        const blobStreamSize = thumbnail.size;

                        blobService.uploadStream(blobStream, blobStreamSize)
                        .then((result) => {
                            const blockBlobThumbClient = clientContainerThumbnails.getBlockBlobClient(blobName + '.jpg');
                            const blobNameThumbnailOld = formatName(thumbnail_url);
                            const blockBlobThumbClientOld = clientContainerThumbnails.getBlockBlobClient(blobNameThumbnailOld);

                            blockBlobThumbClientOld.delete().then(() => console.log('Successfully deleted old thumbnail')).catch(() => console.log('Unable to delete old thumbnail'));

                            db.query(`
                                UPDATE products
                                SET 
                                    thumbnail_url = '${blockBlobThumbClient.url}'
                                WHERE product_id = ${req.params.productId}
                            `, (err, results) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).json('Unable to update document and thumbnail URLs');
                                }
                            });
                        }).catch((err) => {
                            console.log(err);
                        });
                    }

                    return res.status(202).json('Successfully updated all product details!');
                }
            }
        });
    }
});

router.delete('/products/existing/:productId', verifyAdmin, (req, res) => {
    db.query(`
        UPDATE products
        SET status_id = 0 
        WHERE product_id = ${req.params.productId}
    `, (err, result) => {
        if (err) {
            res.status(500).json('Could not delete product');
        } else {
            res.status(203).json('Successfully removed product with id ' + req.params.productId + ' from the store\s catalogue');
        }
    })
});

router.post('/products/new', validateAdminNewProductUpload, verifyAdmin, async (req, res) => {
    const { document, thumbnail, title, author, summary, pages, language, isbn, price, publisher, date } = req.details;

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING);
    const clientContainerThumbnails = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME_ONE);
    const clientContainerDocuments = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME_TWO);

    const blobArrayThumbnails = [];
    const blobArrayDocuments = [];

    for await (const blob of clientContainerThumbnails.listBlobsFlat()) {
        blobArrayThumbnails.push(blob.name);
    }

    for await (const blob of clientContainerDocuments.listBlobsFlat()) {
        blobArrayDocuments.push(blob.name);
    }

    let blobName = formatFileName(thumbnail.name);
    const blobService = new BlockBlobClient(process.env.CONNECTION_STRING, process.env.CONTAINER_NAME_ONE, blobName + '.jpg');
    const blobStream = getStream(thumbnail.data);
    const blobStreamSize = thumbnail.size;

    let blobDocName = formatFileName(document.name);
    const blobDocService = new BlockBlobClient(process.env.CONNECTION_STRING, process.env.CONTAINER_NAME_TWO, blobDocName + '.pdf');
    const blobDocStream = getStream(document.data);
    const blobDocStreamSize = document.size;

    // We check if the blob already exists in the container
    const found = binarySearch(bubbleSort(blobArrayThumbnails), blobName + '.jpg');
    const found2 = binarySearch(bubbleSort(blobArrayDocuments), blobDocName + '.pdf');

    if (found === 1 || found2 === 1) {
        res.status(500).json({defaultErr: 'Document or cover page already exists'});
    } else {
        Promise.all([
            blobService.uploadStream(blobStream, blobStreamSize), 
            blobDocService.uploadStream(blobDocStream, blobDocStreamSize)
        ]).then((result) => {
            const blockBlobDocClient = clientContainerDocuments.getBlockBlobClient(blobDocName + '.pdf');
            const blockBlobThumbClient = clientContainerThumbnails.getBlockBlobClient(blobName + '.jpg');

            // Adding reading permission for a limited amount of time
            const permissions = new BlobSASPermissions();
            permissions.read = true;
            const currentDateTime = new Date();
            const expireDateTime = new Date(currentDateTime.setMinutes(currentDateTime.getMinutes() + 5));
            const blobSASModel = {
                containerName: process.env.CONTAINER_NAME_TWO,
                blobName: blobDocName + '.pdf',
                permissions,
                expiresOn: expireDateTime
            };

            // Create Shared Access Signature (so that anonymous access is set to read-only)
            const sharedAccessCredentials = new StorageSharedKeyCredential(process.env.ACCOUNT_NAME, process.env.ACCOUNT_KEY);
            const SAStoken = generateBlobSASQueryParameters(blobSASModel, sharedAccessCredentials);
            const blobURL = blockBlobDocClient.url + '?' + SAStoken; // URL that we will use

            /* ------------------------------------------------------------------------------------ */
            /* --- Checking to see if the details of the document already exist in the database --- */
            /* ------------------------------------------------------------------------------------ */

            db.query(`
                SELECT product_id, title, description, price, thumbnail_url, document_url, status_id, language, num_pages, isbn 
                FROM products
                WHERE title = '${title}' OR description = '${summary}' OR thumbnail_url = '${blockBlobThumbClient.url}' OR document_url = '${blobURL}' OR (isbn = '${isbn}' AND isbn <> 'N/A')
            `, (err, result) => {
                if (err) {
                    res.status(500).json({defaultErr: 'An error occured in the uploading process'});
                } else {
                    const data = result.rows[0];
                    if (data) {
                        res.status(403).json({ defaultErr: 'Document entry already exists' });
                    } else {

                        /* ------------------------------------------------------------------------------- */
                        /* --- Adding the details to the database and set status of product to PENDING --- */
                        /* ------------------------------------------------------------------------------- */
                        
                        db.query(`
                            INSERT INTO products (title, description, publisher, date_published, price, thumbnail_url, document_url, status_id, language, num_pages, isbn)
                            VALUES ('${title}', '${summary}', '${publisher}', ${date}, ${price}, '${blockBlobThumbClient.url}', '${blobURL}', 0, '${language}', ${pages}, '${isbn}')
                            RETURNING *
                        `, (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({defaultErr: 'An error occured in the document creation process'});
                            } else {
                                const productData = result.rows[0];
                                console.log(productData);

                                const authorsToAdd = author.split(',').map(auth => auth.trim());

                                authorsToAdd.forEach(elem => {
                                    db.query(`
                                        SELECT a.author_id, a.author_name, COUNT(pa.product_id) AS products
                                        FROM authors AS a
                                        JOIN products_authors_junction AS pa
                                        ON a.author_id = pa.author_id
                                        WHERE a.author_name = '${elem}'
                                        GROUP BY a.author_id;
                                    `, (err, results) => {
                                        if (err) {
                                            console.log('Author does not exist');
                                        } else {
                                            const authorData = results.rows[0];
                                            if (authorData === undefined) {
                                                db.query(`
                                                    INSERT INTO authors (author_name, user_id)
                                                    VALUES('${elem}', null) RETURNING *
                                                `, (err, resAuth) => {
                                                    if (err) {
                                                        console.log('Author could not be created');
                                                    } else {
                                                        const newAuthorData = resAuth.rows[0];
                                                        db.query(`
                                                            INSERT INTO products_authors_junction (product_id, author_id)
                                                            VALUES(${productData.product_id}, ${newAuthorData.author_id})
                                                        `, (err, results) => {
                                                            if (err) {
                                                                console.log('Product-author relationship could not be created');
                                                            } else {
                                                                console.log('Successfully added author ' + newAuthorData.author_name);
                                                            }
                                                        });
                                                    }
                                                });
                                            } else {
                                                db.query(`
                                                    INSERT INTO products_authors_junction (product_id, author_id)
                                                    VALUES(${productData.product_id}, ${authorData.author_id})
                                                `, (err, results) => {
                                                    if (err) {
                                                        console.log('Product-author relationship could not be created');
                                                    } else {
                                                        console.log('Successfully added author ' + authorData.author_name);
                                                    }
                                                });
                                            }
                                        }
                                    });
                                });
                            }
                        })
                    }
                }
            })
        }).catch((err) => {
            console.log(err);
        });
    }
});

const formatName = (url) => {
    let tempUrl = url.split('?')[0]; // get rid of the SAS token
    let urlArray = tempUrl.split('/');
    return urlArray[urlArray.length-1];
}

const formatFileName = (name) => {
    // remove the file extension
    let myStringArr = name.split('.');
    myStringArr.pop();

    // remove special characters
    myString = myStringArr.join('.').replace(/[,.?!:-]/g, '');

    // remove double spaces and format the words to be separated by underscores
    let finalString = myString.toLowerCase().replace(/\s+/g, ' ').split(' ').join('_'); 
    return finalString;
}

module.exports = router;
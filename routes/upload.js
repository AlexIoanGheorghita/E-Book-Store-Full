const { verifyProfessor, validateUpload } = require('../auth/utilities');
const { binarySearch, bubbleSort } = require('../auth/binarySearch');
const router = require('express').Router();
const { BlobServiceClient, BlockBlobClient, BlobSASPermissions, StorageSharedKeyCredential, generateBlobSASQueryParameters } = require('@azure/storage-blob');
const getStream = require('into-stream');
const db = require('../pool_connection/connect');
const dotenv = require('dotenv');
dotenv.config();

router.post('/upload', [verifyProfessor, validateUpload], async (req, res) => {
    const { document, thumbnail, title, author, summary, pages, language, isbn, price } = req.details;

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
                            VALUES ('${title}', '${summary}', 'Independently published', ${new Date().getFullYear()}, ${price}, '${blockBlobThumbClient.url}', '${blobURL}', 0, '${language}', ${pages}, '${isbn}')
                            RETURNING *
                        `, (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({defaultErr: 'An error occured in the document creation process'});
                            } else {
                                const productData = result.rows[0];
                                console.log(productData);
                                db.query(`
                                    INSERT INTO authors (author_name, user_id)
                                    VALUES ('${author}', ${req.user.id}) RETURNING *
                                `, (err, result) => {
                                    if (err) {
                                        res.status(500).json({defaultErr: 'An error occured in the document creation process'});
                                    } else {
                                        const data = result.rows[0];

                                        db.query(`
                                            INSERT INTO products_authors_junction (author_id, product_id)
                                            VALUES (${data.author_id}, ${productData.product_id})
                                        `, (err, result) => {
                                            if (err) {
                                                res.status(500).json({defaultErr: 'An error occured in the document creation process'});
                                            } else {
                                                res.status(201).json('Successfully created');
                                            }
                                        })
                                    }
                                })
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
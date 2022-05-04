const router = require('express').Router();
const { BlobServiceClient, BlobSASPermissions, StorageSharedKeyCredential, generateBlobSASQueryParameters } = require('@azure/storage-blob');
const { binarySearch, bubbleSort } = require('../auth/binarySearch');
const { verify, validateCredUpdate } = require('../auth/utilities');
const db = require('../pool_connection/connect');

router.get('/details/:id', verify, (req, res) => {
    if (Number(req.params.id) === req.user.id) {

        const userDetails = {general: {}, booksOwned: [], booksWritten: []};

        db.query(`
            SELECT u.last_name, u.first_name, u.email, ut.type_name
            FROM users AS u
            JOIN user_types AS ut
            ON u.user_type_id = ut.user_type_id
            WHERE u.user_id = ${req.user.id}
        `, (err, result) => {
            if (err) {
                res.status(404).json('User details not found');
            } else {
                userDetails.general = result.rows[0];

                db.query(`
                    SELECT p.product_id, p.title, p.thumbnail_url, p.document_url
                    FROM products AS p
                    JOIN users_products_junction AS up ON p.product_id = up.product_id
                    JOIN users AS u ON u.user_id = up.user_id
                    WHERE up.user_id = ${req.user.id}
                `, (err, result) => {
                    if (err) {
                        res.status(500).json('Product details for this user could not be loaded');
                    } else {
                        userDetails.booksOwned = result.rows;

                        db.query(`
                            SELECT p.product_id, p.thumbnail_url, p.document_url
                            FROM products AS p
                            JOIN products_authors_junction AS pa ON p.product_id = pa.product_id
                            JOIN authors AS a ON a.author_id = pa.author_id
                            WHERE a.user_id = ${req.user.id}
                        `, (err, result) => {
                            if (err) {
                                res.status(500).json('Product details for this user could not be loaded');
                            } else {
                                userDetails.booksWritten = result.rows;
                                
                                res.status(200).json({ userDetails });
                            }
                        });
                    }
                });
            }
        });
    } else {
        console.log('An error occured');
        res.status(403).json('Access denied');
    }
});

router.post('/details/:id', [verify, validateCredUpdate], (req, res) => {
    if (Number(req.params.id) === req.user.id) {
        const { last_name, first_name, email } = req.details;

        db.query(`
            UPDATE users
            SET last_name = '${last_name}', first_name = '${first_name}', email = '${email}'
            WHERE user_id = ${req.user.id}
        `, (err, result) => {
            if (err) {
                res.status(500).json({ message: 'Unable to update credentials' });
            } else {
                res.status(200).json({ message: 'Credentials updated successfully!' });
            }
        });
    } else {
        console.log('You are not authenticated');
        res.status(403).json({ message: 'You are not authenticated' });
    }
});

router.get('/details/:id/:productId', verify, (req, res) => {
    if (Number(req.params.id) === req.user.id) {
        db.query(`
            SELECT product_id, title, document_url, status_id
            FROM products
            WHERE product_id = ${req.params.productId}
        `, (err, result) => {
            if (err) {
                res.status(404).json({ message: 'Requested book not found' });
            } else {
                const data = result.rows[0];
                if (data.status_id === 1) {

                    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING);
                    const clientContainerDocuments = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME_TWO);
                    let blobURL = '';

                    //console.log(data.title);
                    let blobName = formatTitle(data.title);
                    ///console.log(blobName);
                    const blockBlobDocClient = clientContainerDocuments.getBlockBlobClient(blobName + '.pdf');
                    //console.log(blockBlobDocClient.url);
                    

                    const permissions = new BlobSASPermissions();
                    permissions.read = true;
                    const currentDateTime = new Date();
                    const expiryDateTime = new Date(currentDateTime.setMinutes(currentDateTime.getMinutes() + 5));

                    const blobSASModel = {
                        containerName: process.env.CONTAINER_NAME_TWO,
                        blobName: blobName + '.pdf',
                        permissions,
                        expiresOn: expiryDateTime
                    }

                    const sharedAccessCredentials = new StorageSharedKeyCredential(process.env.ACCOUNT_NAME, process.env.ACCOUNT_KEY);
                    const SAStoken = generateBlobSASQueryParameters(blobSASModel, sharedAccessCredentials);
                    blobURL = blockBlobDocClient.url + '?' + SAStoken; // URL that a user can access to view the PDF

                    res.status(200).json({ document_url: blobURL });
                } else {
                    res.status(403).json({ message: 'You are not allowed to access this resource' });
                }
            }
        })
    } else {
        console.log('You are not authenticated');
        res.status(403).json({ message: 'You are not authenticated' });
    }
});

router.get('/:id/delete', verify, (req, res) => {
    if (Number(req.params.id) === req.user.id) {
        db.query(`
            SELECT user_id, user_type_id, first_name, last_name
            FROM users
            WHERE user_id = ${req.user.id}
        `, (err, result) => {
            if (err) {
                res.status(404).json({ message: 'User does not exist' });
            } else {
                const data = result.rows[0];
                db.query(`
                    DELETE FROM users
                    WHERE user_id = ${data.user_id}
                `, (err, result) => {
                    if (err) {
                        res.status(500).json({ message: 'Could not delete user' });
                    } else {
                        res.status(201).json({ message: 'Account deleted successfully' });
                    }
                })
            }
        })
    } else {
        console.log('You are not authenticated');
        res.status(403).json({ message: 'You are not authenticated' });
    }
});

const formatTitle = (name) => {
    myString = name.replace(/[,.?!:-]/g, '');

    let finalString = myString.toLowerCase().replace(/\s+/g, ' ').split(' ').join('_'); 
    return finalString;
}

module.exports = router;
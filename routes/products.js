const router = require('express').Router();
const { validateReview, verify, verifyIndividualExistence } = require('../auth/utilities');
const db = require('../pool_connection/connect');

router.get('/categories/:category', verifyIndividualExistence, (req, res) => {
    const category = req.params.category;

    if (req.user.type === 'unregistered' || req.user.type === 'individual') {
        db.query(`
            SELECT * FROM categories 
            WHERE cat_name = '${category}'`, (err, result) => {
            if (err) {
                res.status(500).json('An error occured while searching for the category');
            } else {
                const data = result.rows;
                if (!(data[0].parent_cat_id === 3 || (data[0].parent_cat_id === null && data[0].category_id === 3))) {
                    db.query(
                        `SELECT p.product_id, p.title, p.thumbnail_url, p.price, p.date_published, c.cat_name 
                        FROM products AS p
                        JOIN products_categories_junction ON p.product_id = products_categories_junction.product_id
                        JOIN categories AS c ON products_categories_junction.category_id = c.category_id 
                        WHERE c.cat_name = '${category}' AND p.status_id = 1`, (error, results) => {
                        if (error) {
                            res.status(404).send(`Error: ${error.message}. Other details: ${error.name} - ${error.stack}`);
                        } else {
                            res.status(200).json(results.rows);
                        }
                    });
                }
            }
        });
    } else {
        db.query(
            `SELECT p.product_id, p.title, p.thumbnail_url, p.price, p.date_published, c.cat_name 
            FROM products AS p
            JOIN products_categories_junction ON p.product_id = products_categories_junction.product_id
            JOIN categories AS c ON products_categories_junction.category_id = c.category_id 
            WHERE c.cat_name = '${category}' AND p.status_id = 1`, (error, results) => {
            if (error) {
                res.status(404).send(`Error: ${error.message}. Other details: ${error.name} - ${error.stack}`);
            } else {
                res.status(200).json(results.rows);
            }
        });
    }
});

router.get('/:id', verifyIndividualExistence, (req, res) => {
    const productId = req.params.id;
    const details = {product: {}, reviews: [], related: []};

    if (req.user.type === 'unregistered' || req.user.type === 'individual') {
        db.query(`
            SELECT * FROM products_categories_junction AS pc
            JOIN categories AS c ON c.category_id = pc.category_id
            WHERE pc.product_id = ${productId} AND c.parent_cat_id IS NULL AND c.cat_name = 'Reference'
        `, (err, result) => {
            if (err) {
                res.status(500).json('An error occured while trying to search for the product');
            } else {
                const data = result.rows;
                // console.log(data);
                if (data.length === 0) {
                    db.query(
                        `SELECT a.author_id, a.author_name, p.product_id, p.title, p.description, p.publisher, p.date_published, p.price, p.thumbnail_url, p.language, p.num_pages, p.isbn
                        FROM authors AS a
                        JOIN products_authors_junction AS pa ON pa.author_id = a.author_id
                        JOIN products AS p ON p.product_id = pa.product_id
                        WHERE p.product_id = ${productId} AND p.status_id = 1`, (error, results) => {
                            if (error) {
                                res.status(404).send(`Error: ${error.message}. Other details: ${error.name} - ${error.stack}`);
                            } else {
                                details.product = results.rows[0];
                                db.query(
                                    `SELECT 
                                        r.review_id, 
                                        r.product_id, 
                                        r.review_title, 
                                        r.review_description,
                                        r.rating,
                                        DATE(r.review_date) AS review_date,
                                        u.first_name || ' ' || u.last_name AS full_name
                                    FROM reviews AS r
                                    JOIN users AS u
                                    ON r.user_id = u.user_id
                                    WHERE r.product_id = ${productId};`, (error, results) => {
                                        if (error) {
                                            res.status(404).send(`Error: ${error.message}. Other details: ${error.name} - ${error.stack}`);
                                        } else {
                                            details.reviews = results.rows;
                                            db.query(
                                                `SELECT p.product_id, p.title, p.thumbnail_url, string_agg(a.author_name, ', ') AS author_name
                                                FROM authors AS a 
                                                JOIN products_authors_junction AS pa ON pa.author_id = a.author_id
                                                JOIN products AS p ON p.product_id = pa.product_id
                                                WHERE p.product_id IN (SELECT p.product_id
                                                    FROM products AS p
                                                    JOIN products_categories_junction ON p.product_id = products_categories_junction.product_id
                                                    JOIN categories AS c ON products_categories_junction.category_id = c.category_id 
                                                    WHERE 
                                                        c.category_id IN (SELECT c.category_id 
                                                            FROM categories AS c 
                                                            JOIN products_categories_junction AS pc ON c.category_id = pc.category_id
                                                            WHERE pc.product_id = ${productId} AND c.parent_cat_id IS NOT NULL)
                                                        AND p.product_id <> ${productId}
                                                        LIMIT 8)
                                                GROUP BY p.product_id`, (error, results) => {
                                                    if (error) {
                                                        res.status(404).send(`Error: ${error.message}. Other details: ${error.name} - ${error.stack}`);
                                                    } else {
                                                        details.related = results.rows;
                                                        res.status(200).json(details);
                                                    }
                                                });
                                        }
                                    });
                            }
                        });
                } else {
                    res.status(401).json('You are not allowed to view this product');
                }
            }
        });
    } else {
        db.query(
            `SELECT a.author_id, a.author_name, p.product_id, p.title, p.description, p.publisher, p.date_published, p.price, p.thumbnail_url, p.language, p.num_pages, p.isbn
            FROM authors AS a
            JOIN products_authors_junction AS pa ON pa.author_id = a.author_id
            JOIN products AS p ON p.product_id = pa.product_id
            WHERE p.product_id = ${productId} AND p.status_id = 1`, (error, results) => {
                if (error) {
                    res.status(404).send(`Error: ${error.message}. Other details: ${error.name} - ${error.stack}`);
                } else {
                    details.product = results.rows[0];
                    db.query(
                        `SELECT 
                            r.review_id, 
                            r.product_id, 
                            r.review_title, 
                            r.review_description,
                            r.rating,
                            DATE(r.review_date) AS review_date,
                            u.first_name || ' ' || u.last_name AS full_name
                        FROM reviews AS r
                        JOIN users AS u
                        ON r.user_id = u.user_id
                        WHERE r.product_id = ${productId};`, (error, results) => {
                            if (error) {
                                res.status(404).send(`Error: ${error.message}. Other details: ${error.name} - ${error.stack}`);
                            } else {
                                details.reviews = results.rows;
                                db.query(
                                    `SELECT p.product_id, p.title, p.thumbnail_url, string_agg(a.author_name, ', ') AS author_name
                                    FROM authors AS a 
                                    JOIN products_authors_junction AS pa ON pa.author_id = a.author_id
                                    JOIN products AS p ON p.product_id = pa.product_id
                                    WHERE p.product_id IN (SELECT p.product_id
                                        FROM products AS p
                                        JOIN products_categories_junction ON p.product_id = products_categories_junction.product_id
                                        JOIN categories AS c ON products_categories_junction.category_id = c.category_id 
                                        WHERE 
                                            c.category_id IN (SELECT c.category_id 
                                                FROM categories AS c 
                                                JOIN products_categories_junction AS pc ON c.category_id = pc.category_id
                                                WHERE pc.product_id = ${productId} AND c.parent_cat_id IS NOT NULL)
                                            AND p.product_id <> ${productId}
                                            LIMIT 8)
                                    GROUP BY p.product_id`, (error, results) => {
                                        if (error) {
                                            res.status(404).send(`Error: ${error.message}. Other details: ${error.name} - ${error.stack}`);
                                        } else {
                                            details.related = results.rows;
                                            res.status(200).json(details);
                                        }
                                    });
                            }
                        });
                }
            });
    }
});

router.post('/:id/review/:userId', verify, validateReview, (req, res) => {
    const { title, description, rating } = req.details;

    if (req.user.type === 'individual') { // user type is 'individual'
        // We check if the product that the user reviews is a part of reference books or not.
        db.query(`
            SELECT * FROM products_categories_junction AS pc
            JOIN categories AS c ON c.category_id = pc.category_id
            WHERE pc.product_id = ${req.params.id} AND c.parent_cat_id IS NULL AND c.cat_name = 'Reference'
        `, (err, result) => {
            if (err) {
                res.status(403).json('You are not allowed to leave a review on this product');
            } else {
                const data = result.rows;
                // console.log(data);
                if (data.length === 0) {
                    db.query(`
                        SELECT * FROM reviews
                        WHERE user_id = ${req.user.id} AND product_id = ${req.params.id}
                    `, (err, result2) => {
                        if (err) {
                            res.status(403).json({ defaultErr: 'You have already left a review on this product'});
                        } else {
                            const data2 = result2.rows;
                            if (data2.length === 0) {
                                db.query(`
                                    INSERT INTO reviews (user_id, product_id, review_title, review_description, rating, review_date)
                                    VALUES (${req.user.id}, ${req.params.id}, '${title}', '${description}', ${Number(rating).toFixed(1)}, NOW()) RETURNING *
                                `, (err, result3) => {
                                    if (err) {
                                        res.status(500).json({ defaultErr: 'Could not add a new review'});
                                    } else {
                                        res.status(200).json({ ...result3.rows[0], full_name: req.user.name });
                                    }
                                })
                            } else {
                                res.status(403).json({ defaultErr: 'You have already left a review on this product'});
                            }
                        }
                    });
                } else {
                    res.status(403).json({ defaultErr: 'You are not allowed to leave a review on this product'});
                }
            }
        });
    } else {
        db.query(`
            SELECT * FROM reviews
            WHERE user_id = ${req.user.id} AND product_id = ${req.params.id}
        `, (err, result2) => {
            if (err) {
                res.status(403).json({ defaultErr: 'You have already left a review on this product'});
            } else {
                const data = result2.rows;
                if (data.length === 0) {
                    db.query(`
                        INSERT INTO reviews (user_id, product_id, review_title, review_description, rating, review_date)
                        VALUES (${req.user.id}, ${req.params.id}, '${title}', '${description}', ${Number(rating).toFixed(1)}, NOW()) RETURNING *
                    `, (err, result3) => {
                        if (err) {
                            res.status(500).json({ defaultErr: 'Could not add new review'});
                        } else {
                            // console.log('Success');
                            res.status(200).json({ ...result3.rows[0], full_name: req.user.name });
                        }
                    })
                } else {
                    res.status(403).json({ defaultErr: 'You have already left a review on this product'});
                }
            }
        });
    }
});

router.post('/search', verifyIndividualExistence, (req, res) => {
    const { searchValue } = req.body;

    if (req.user.type === 'individual' || req.user.type === 'unregistered') {
        db.query(`SELECT DISTINCT p.product_id, p.title
            FROM products AS p 
            JOIN products_categories_junction AS pc ON p.product_id = pc.product_id
            JOIN categories AS c ON c.category_id = pc.category_id
            WHERE p.title ILIKE '%${searchValue.toLowerCase()}%' AND ((c.parent_cat_id IS NULL AND c.cat_name <> 'Reference') OR c.parent_cat_id <> 3) ORDER BY p.title`, 
        (err, result) => {
            if (err) {
                req.status(500).json('Could not retrieve products');
            } else {
                const data = result.rows;
                if (data.length > 0) {
                    // if there are products that match the search, we send back the results
                    res.status(200).json({ searchResults: data });
                } else {
                    res.status(200).json({ searchResults: [{product_id: null, title: 'No matches found'}] });
                }
            }
        });
    } else {
        db.query(`SELECT product_id, title FROM products WHERE title ILIKE '%${searchValue.toLowerCase()}%' ORDER BY title`, (err, result) => {
            if (err) {
                req.status(500).json('Could not retrieve products');
            } else {
                const data = result.rows;
                if (data.length > 0) {
                    // if there are products that match the search, we send back the results
                    res.status(200).json({ searchResults: data });
                } else {
                    res.status(200).json({ searchResults: [{product_id: null, title: 'No matches found'}] });
                }
            }
        })
    }
});

module.exports = router;
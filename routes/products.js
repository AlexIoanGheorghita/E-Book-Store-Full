const router = require('express').Router();
const db = require('../pool_connection/connect');

router.get('/categories/:category', (req, res) => {
    const category = req.params.category;
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
});

router.get('/:id', (req, res) => {
    const productId = req.params.id;
    const details = {product: {}, reviews: [], related: []};

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
                                `SELECT p.product_id, p.title, p.thumbnail_url, a.author_name
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
                                        LIMIT 8);`, (error, results) => {
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
});

module.exports = router;
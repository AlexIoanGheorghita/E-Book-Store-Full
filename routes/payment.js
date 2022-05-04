const { verify } = require('../auth/utilities');
const db = require('../pool_connection/connect');
const router = require('express').Router();
const stripe = require('stripe')('sk_test_51Kk5IHHOAhJOWysBgLLtIljUzOODFxLqNrVUSNYwYOqkugk7VOj70OisUe1TjqzQdg635W97wg3JBX0ZDS5r5VsF00atR5yaeK');

router.post('/create-payment-intent', verify, async (req, res) => {
    // when the user submits the "checkout" button on the client, a PaymentIntent needs to be created
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateAmount(req.body.product),
        currency: 'ron',
        payment_method_types: [
            "card"
        ]
    });

    res.send({ clientSecret: paymentIntent.client_secret });
});

router.post('/submit-order-details', verify, (req, res) => {
    const { products } = req.body;
    console.log(products);

    // Formatting a date correctly for storing it in the database
    const date = new Date().toISOString().slice(0, new Date().toISOString().length - 1).split('T').join(' ');

    db.query(`
        INSERT INTO orders (user_id, order_date)
        VALUES(${req.user.id}, '${date}') RETURNING *
    `, (err, result) => {
        if (err) {
            res.status(500).json('A server error occured');
        } else {
            const orderId = result.rows[0].order_id;

            let insertOrderString = JSON.parse(products).reduce((accumulator, currentValue) => {
                if (currentValue.product_id === JSON.parse(products)[JSON.parse(products).length-1].product_id) {
                    return accumulator + ` (${orderId}, ${currentValue.product_id})`
                } else {
                    return accumulator + ` (${orderId}, ${currentValue.product_id}),`
                }
            }, 'VALUES');


            db.query(`
                INSERT INTO products_orders_junction (order_id, product_id)
                ${insertOrderString}
            `, (err, result) => {
                if (err) {
                    res.status(500).json('A server error occured');
                } else {
                    let insertProductString = JSON.parse(products).reduce((accumulator, currentValue) => {
                        if (currentValue.product_id === JSON.parse(products)[JSON.parse(products).length-1].product_id) {
                            return accumulator + ` (${req.user.id}, ${currentValue.product_id})`
                        } else {
                            return accumulator + ` (${req.user.id}, ${currentValue.product_id}),`
                        }
                    }, 'VALUES');

                    db.query(`
                        INSERT INTO users_products_junction (user_id, product_id)
                        ${insertProductString}
                    `, (err, result) => {
                        if (err) {
                            res.status(500).json('A server error occured');
                        } else {
                            res.status(201).json('Successfully created');
                        }
                    });
                }
            });
        }
    });
});

const calculateAmount = (items) => {
    let amount = 0;

    for (const item of JSON.parse(items)) {
        let formattedNumberArr = item.price.split('.').join('');
        amount += Number(formattedNumberArr);
    }

    return amount;
}

module.exports = router;
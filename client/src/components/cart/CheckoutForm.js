import React, { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { FormWrapper, Form, Button } from './CheckoutForm.styled';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeAllProducts } from '../../store/cartSlice';
import { axios_ } from '../../axios/base_url';

const CheckoutForm = ({ products }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        try {
            const result = await axios_.post('/payment/create-payment-intent', { product: JSON.stringify(products) });
            if (result) {
                const clientSecret = result.data.clientSecret;
                const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement)
                    }
                });

                setIsLoading(false);
                if (paymentResult.error) {
                    setMessage(paymentResult.error.message);
                } else if (paymentResult.paymentIntent.status === 'succeeded') {
                    setMessage('Succeeded!');
                    console.log(products);
                    setTimeout(async () => {
                        try {
                            await axios_.post('/payment/submit-order-details', { products: JSON.stringify(products) });
                        } catch (err) {
                            console.log(err);
                        }
                        dispatch(removeAllProducts());
                        navigate('/products/categories/Adventure');
                    }, 1500);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <FormWrapper>
            <Form id="payment-form" onSubmit={handleSubmit}>
                <CardElement id="payment-element" />
                <Button disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </Button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </Form>
        </FormWrapper>
    )
}

export default CheckoutForm
import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { selectAllProducts } from '../store/cartSlice';
import { useSelector } from 'react-redux';
import CheckoutForm from '../components/cart/CheckoutForm';
import { ModalContainer, ViewWindow } from '../components/publish/Modal.styled';
import { makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles({
    close: {
        width: '30px',
        height: '30px'
    }
});

const stripePromise = loadStripe('pk_test_51Kk5IHHOAhJOWysB9lWtCRL8n0UbXcbZaJNLQdmyD9UWTumJcN934b9PBGeTIgA5bdo6tI0kpA5fYxGLZwZCJ7Dp00GZ9dcy3X');

const CheckoutModal = ({ closeModal, show }) => {
    const classes = useStyles();
    const cartProducts = useSelector(selectAllProducts);

    const options = {
        appearence: {
            theme: 'stripe'
        }
    };

    return (
        <ModalContainer visible={show}>
            <span className='close'><Close onClick={closeModal} className={classes.close}/></span>
            <ViewWindow>
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm products={cartProducts}/>
                </Elements>
            </ViewWindow>
        </ModalContainer>
    )
}

export default CheckoutModal
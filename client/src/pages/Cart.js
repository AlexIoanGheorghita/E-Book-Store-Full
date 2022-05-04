import React, { useEffect, useState } from 'react';
import { CartContainer, CartList, PaymentDetails, Title, Table, TableRow, Button } from './Cart.styled';
import CartProduct from '../components/cart/CartProduct';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../store/cartSlice';
import CheckoutModal from './CheckoutModal';

const Cart = () => {
    const [subtotal, setSubtotal] = useState(0.0);
    const [discount, setDiscount] = useState(0.0);
    const [total, setTotal] = useState(0.0);
    const [showModal, setShowModal] = useState(false);
    const cartProducts = useSelector(selectAllProducts);

    useEffect(() => {
        calculateSubtotal();
        calculateDiscount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subtotal, cartProducts]);

    const calculateSubtotal = () => {
        const sub = cartProducts.reduce((accumulator, current) => { return accumulator + Number(current.price) }, 0).toFixed(2);
        setSubtotal(sub);
    };

    const calculateDiscount = () => {
        if (subtotal >= 200) {
            setDiscount((subtotal*0.10).toFixed(2));
            setTotal((subtotal - subtotal*0.10).toFixed(2));
        } else {
            setDiscount((0.0).toFixed(2));
            setTotal(subtotal);
        }
    }

    const handleClick = () => {
        if (subtotal && total && cartProducts.length >= 1) {
            setShowModal(true);
        }
    }

    const handleHide = () => {
        setShowModal(false);
    };

    return (
        <>
            <CartContainer>
                <CartList>
                    {cartProducts.map(item => {
                        return <CartProduct key={item.product_id} details={item} />
                    })}
                </CartList>
                <PaymentDetails>
                    <Title>My Cart <span>({cartProducts.length} products)</span></Title>
                    <Table>
                        <tbody>
                            <TableRow>
                                <td>Subtotal:</td>
                                <td>RON {subtotal}</td>
                            </TableRow>
                            <TableRow>
                                <td>Discount:</td>
                                <td>RON {discount}</td>
                            </TableRow>
                            <TableRow>
                                <td>Total:</td>
                                <td>RON {total}</td>
                            </TableRow>
                        </tbody>
                    </Table>
                    <Button onClick={handleClick}>Checkout Now</Button>
                </PaymentDetails>
            </CartContainer>
            <CheckoutModal show={showModal} closeModal={handleHide} />
        </>
    )
};

export default Cart;

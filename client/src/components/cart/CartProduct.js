import { makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../../store/cartSlice';
import { Wrapper, ImageWrapper, Image, Details, Title, ProductID, Price, RemoveButton } from './CartProduct.styled';

const useStyles = makeStyles({
    deleteIcon: {
        fontSize: '1rem',
        marginRight: '2px'
    }
});

const CartProduct = ({ details }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleRemove = () => {
        dispatch(removeProduct(details));
    }

    return (
        <Wrapper>
            <ImageWrapper>
                <Image src={details.thumbnail_url}/>
            </ImageWrapper>
            <Details>
                <Title>{details.title}</Title>
                <ProductID><span>ID:</span> {details.product_id}</ProductID>
                <Price><span>Price:</span> RON {Number(details.price).toFixed(2)}</Price>
                <RemoveButton onClick={handleRemove}><Delete className={classes.deleteIcon}/>Remove</RemoveButton>
            </Details>
        </Wrapper>
    )
};

export default CartProduct;

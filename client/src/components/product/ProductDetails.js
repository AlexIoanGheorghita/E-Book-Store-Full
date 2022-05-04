import React from 'react';
import { 
    ProductWrapper, 
    ImageContainer, 
    Image, 
    Section, 
    ProductTitle, 
    ProductAuthor, 
    ProductDescription, 
    AdditionalDetails,
    Item,
    Price, 
    Span, 
    Button
} from './ProductDetails.styled';
import Rating from '../Rating';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/cartSlice';

const ProductDetails = ({ prodDetails, rating }) => {
    const { product, reviews } = prodDetails;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleProductAdd = () => {
        const role = sessionStorage.getItem('role');
        if (role && (role !== 'admin' && role !== 'individual')) {
            dispatch(addProduct(product));
        } else {
            navigate('/login');
        }
    }

    return (
        <ProductWrapper>
            <Section>
                <ImageContainer>
                    <Image src={product.thumbnail_url}/>
                </ImageContainer>
            </Section>
            <Section>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductAuthor>by {product.author_name}, <span style={{fontStyle: 'italic'}}>{product.date_published}</span></ProductAuthor>
                <ProductDescription>Summary: {product.description}</ProductDescription>
                <AdditionalDetails>
                    <Item><span>Publisher:</span> {product.publisher}</Item>
                    <Item><span>ISBN:</span> {product.isbn}</Item>
                    <Item><span>Pages:</span> {product.num_pages}</Item>
                    <Item><span>Language:</span> {product.language}</Item>
                </AdditionalDetails>
                <Rating length={reviews.length} rating={rating}/>
                {product.price ? (product.price !== '0.00' ? <Price>RON {product.price.split('.')[0]}.<Span>{product.price.split('.')[1]}</Span></Price> : <Price>FREE</Price>) : " "}
                <Button onClick={handleProductAdd}>Add to cart</Button>
            </Section>
        </ProductWrapper>
    )
};

export default ProductDetails;

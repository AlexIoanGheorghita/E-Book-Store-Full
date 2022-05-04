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
} from '../publish/ProductPreview.styled';
import Rating from '../Rating';

const UploadPreview = ({ prodDetails, rating, numOfReviews }) => {
    const { thumbnail, title, author, summary, pages, language, isbn, price, publisher, date_published } = prodDetails;

    return (
        <ProductWrapper>
            <Section>
                <ImageContainer>
                    <Image src={thumbnail}/>
                </ImageContainer>
            </Section>
            <Section>
                <ProductTitle>{title}</ProductTitle>
                <ProductAuthor>by {author}, <span style={{fontStyle: 'italic'}}>{date_published}</span></ProductAuthor>
                <ProductDescription>Summary: {summary}</ProductDescription>
                <AdditionalDetails>
                    <Item><span>Publisher:</span> {publisher}</Item>
                    <Item><span>ISBN:</span> {isbn}</Item>
                    <Item><span>Pages:</span> {pages}</Item>
                    <Item><span>Language:</span> {language}</Item>
                </AdditionalDetails>
                <Rating length={numOfReviews} rating={rating}/>
                {price ? (String(price) !== '0.00' ? (String(Number(price).toFixed(2)).split('.').length > 1 ? <Price>RON {String(Number(price).toFixed(2)).split('.')[0]}.<Span>{String(Number(price).toFixed(2)).split('.')[1]}</Span></Price> : <Price>RON {price}</Price>) : <Price>FREE</Price>) : " "}
                <Button>Add to cart</Button>
            </Section>
        </ProductWrapper>
    )
}

export default UploadPreview
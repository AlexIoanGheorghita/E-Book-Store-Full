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
} from './ProductPreview.styled';
import Rating from '../Rating';

const ProductPreview = ({ prodDetails, rating, numOfReviews }) => {
    const { thumbnail, title, author, summary, pages, language, isbn, price } = prodDetails;

    /* --- The code below works for when there is a commma-separated list of authors --- */
    // DO NOT DELETE!!!

    // let authorString = '';
    // console.log(author);

    // if (author.length > 1) {
    //     authorString = author.map(elem => {
    //         if (elem.lastName !== undefined) {
    //             return elem.lastName + ' ' + elem.firstName;
    //         } else {
    //             return elem.firstName;
    //         }
    //     }).join(', ');
    // } else {
    //     if (author.lastName !== undefined) {
    //         authorString = author[0].lastName + ' ' + author[0].firstName;
    //     } else if (author.firstName) {
    //         authorString = author[0].firstName;
    //         console.log(authorString);
    //     }
    // }

    return (
        <ProductWrapper>
            <Section>
                <ImageContainer>
                    <Image src={thumbnail && URL.createObjectURL(thumbnail)}/>
                </ImageContainer>
            </Section>
            <Section>
                <ProductTitle>{title}</ProductTitle>
                <ProductAuthor>by {author}, <span style={{fontStyle: 'italic'}}>{new Date().getFullYear()}</span></ProductAuthor>
                <ProductDescription>Summary: {summary}</ProductDescription>
                <AdditionalDetails>
                    <Item><span>Publisher:</span> Self-published</Item>
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

export default ProductPreview
import React from 'react';
import { Wrapper, ImageWrapper, Image, DetailsWrapper, Button } from './ProductCard.styled';

const ProductCard = ({title, image, price}) => {
    return (
        <Wrapper>
            <ImageWrapper>
                <Image src={image}/>
            </ImageWrapper>
            <DetailsWrapper>
                {/* <Title>{title}</Title>
                <Author>George </Author> */}
                <Button>{price}</Button>
            </DetailsWrapper>
        </Wrapper>
    )
}

export default ProductCard

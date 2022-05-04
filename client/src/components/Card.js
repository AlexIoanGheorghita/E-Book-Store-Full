import React from 'react';
import { Container, ThumbnailContainer, Thumbnail, TextDetails, Title, Author } from './Card.styled';

const Card = ({ title, author, image }) => {
    return (
        <Container>
            <ThumbnailContainer>
                <Thumbnail src={image}/>
            </ThumbnailContainer>
            <TextDetails>
                <Title>{title}</Title>
                <Author>{author}</Author>
            </TextDetails>
        </Container>
    )
}

export default Card

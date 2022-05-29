import React from 'react';
import { Container, ThumbnailContainer, Thumbnail, TextDetails, Title, Author } from './Card.styled';

const Card = ({ maximize, title, author, image }) => {
    return (
        <Container maximize={maximize}>
            <ThumbnailContainer maximize={maximize}>
                <Thumbnail src={image}/>
            </ThumbnailContainer>
            <TextDetails maximize={maximize}>
                <Title maximize={maximize}>{title}</Title>
                {maximize === false ? <Author>{author}</Author> : null}
            </TextDetails>
        </Container>
    )
}

export default Card

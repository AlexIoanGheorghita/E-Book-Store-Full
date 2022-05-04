import React from 'react';
import { Wrapper, Header, Details, ReviewTitle, User, Message } from './Review.styled';
import Rating from './Rating';
import { Avatar } from '@material-ui/core';

const Review = ({ data }) => {

    return (
        <Wrapper>
            <Header>
                <Avatar />
                <Details>
                    <ReviewTitle>{data.review_title}</ReviewTitle>
                    <User>posted by {data.full_name} on {data.review_date.split('T')[0]}</User>
                </Details>
            </Header>
            <Rating rating={Number(data.rating)}/>
            <Message>{data.review_description}</Message>
        </Wrapper>
    )
}

export default Review

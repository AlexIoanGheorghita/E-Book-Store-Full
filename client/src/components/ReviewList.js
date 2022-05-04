import React from 'react';
import { Container, ReviewListTitle, Wrapper } from './ReviewList.styled';
import ReviewField from './ReviewField';
import Review from './Review';

const ReviewList = ({ reviewArr }) => {
    return (
        <Container>
            <ReviewField />
            <Wrapper>
                {reviewArr.length > 0 ?
                <ReviewListTitle>Reviews</ReviewListTitle> : null}
                
                {reviewArr.map(review => {
                    return <Review key={review.review_id} data={review}/>
                })}
            </Wrapper>
        </Container>
    )
}

export default ReviewList

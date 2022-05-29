import React from 'react';
import { Container, ReviewListTitle, Wrapper } from './ReviewList.styled';
import ReviewField from './ReviewField';
import Review from './Review';

const ReviewList = ({ setDetails, details, productId }) => {
    return (
        <Container>
            <ReviewField setDetails={setDetails} details={details} id={productId}/>
            <Wrapper>
                {details.reviews.length > 0 ?
                <ReviewListTitle>Reviews</ReviewListTitle> : null}
                
                {details.reviews.map(review => {
                    return <Review key={review.review_id} data={review}/>
                })}
            </Wrapper>
        </Container>
    )
}

export default ReviewList

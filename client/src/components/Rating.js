import { makeStyles } from '@material-ui/core';
import { Star, StarHalfOutlined, StarOutline } from '@material-ui/icons';
import React, { useLayoutEffect, useState } from 'react';
import { RatingWrapper, Score } from './Rating.styled';

const useStyles = makeStyles({
    star: {
        color: '#ffc266'
    }
});

const Rating = (props) => {
    const classes = useStyles();
    const [rating, setRating] = useState([]);
    const [score, setScore] = useState(0.0);

    useLayoutEffect(() => {
        calculateRating(props.rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.rating])

    const calculateRating = (rating) => {
        const starFilledArray = [];

        /* Calculate the average rating, and turn it into a string to access the remainder and whole part */
        const totalRating = String(rating.toFixed(1));
        setScore(totalRating);
    
        const fullPart = Number(totalRating.split('.')[0]);
        const remainder = Number(totalRating.split('.')[1]);

        if (fullPart === 0) {
            for (let i = 0; i < 5; i++) {
                starFilledArray.push(<StarOutline className={classes.star}/>);
            }
        } else {
            for (let i = 0; i < fullPart; i++) {
                starFilledArray.push(<Star className={classes.star}/>);
            }

            if (remainder < 5 && fullPart < 5) {
                starFilledArray.push(<StarOutline className={classes.star}/>);
            } else if (remainder >= 5 && fullPart < 5) {
                starFilledArray.push(<StarHalfOutlined className={classes.star}/>);
            }

            if (fullPart < 4) {
                starFilledArray.push(<StarOutline className={classes.star}/>);
            }
        }

        // Adding keys to the stars, because they are items of a list

        const finalArray = [];

        for (let i = 0; i < 5; i++) {
            let clone = {...starFilledArray[i]};
            clone.key = i;
            finalArray.push(clone);
        }

        setRating(finalArray);
    };

    return (
        <RatingWrapper>{rating} <Score>{score} {props.length ? ( props.length > 1 ? ` (${props.length} reviews)`: ` (${props.length} review)`) : '(No reviews)'}</Score></RatingWrapper>
    )
}

export default Rating

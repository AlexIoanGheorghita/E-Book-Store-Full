import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { Wrapper, Slider, ArrowWrapper, SliderTitle } from './Slider.styled';
import Card from './Card';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    arrowLeft: (props) => ({
        fontSize: '2.2rem',
        color: props.endLeft ? '#A6A6A6' : '#000000'
    }),
    arrowRight: (props) => ({
        fontSize: '2.2rem',
        color: props.endRight ? '#A6A6A6' : '#000000'
    })
});

const ProductSlider = ({ books }) => {
    const [count, setCount] = useState(0);

    const handleCount = (direction) => {
        if (direction === 'left' && count > 0) {
            setCount(count - 1);

        } else if (direction === 'right' && count <= 4) {
            setCount(count + 1);
        }  
    };

    const handleEndReachLeft = () => {
        return count === 0;
    }

    const handleEndReachRight = () => {
        return count === 5;
    }

    const classes = useStyles({ endLeft: handleEndReachLeft(), endRight: handleEndReachRight() });

    return (
        <>
            <SliderTitle>Products from the same category</SliderTitle>
            <Wrapper>
                <ArrowWrapper direction='left' onClick={() => handleCount('left')}>
                    <ArrowLeftOutlined className={classes.arrowLeft}/>
                </ArrowWrapper>
                <Slider distance={count}>
                    {books.map(book => {
                        return <Card key={book.product_id} title={book.title} author={book.author_name} image={book.thumbnail_url}></Card>
                    })}
                </Slider>
                <ArrowWrapper direction='right' onClick={() => handleCount('right')}>
                    <ArrowRightOutlined className={classes.arrowRight}/>
                </ArrowWrapper>
            </Wrapper>
        </>
    )
}

export default ProductSlider

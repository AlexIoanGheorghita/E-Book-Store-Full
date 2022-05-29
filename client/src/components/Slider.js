import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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
    const sliderRef = useRef();

    const handleCount = (direction) => {
        if (direction === 'left' && count > 0) {
            setCount(count - 1);

        } else if (direction === 'right' && count <= calculateSteps(books.length) - 1) {
            setCount(count + 1);
        }  
    };

    const handleEndReachLeft = () => {
        return count === 0;
    }

    const handleEndReachRight = () => {
        return count === calculateSteps(books.length);
    }

    const calculateSteps = (length) => {
        let containerWidth = 0;
        const elementsTotalWidth = Math.floor(length * 162); // 162px is the width of each element in the slider
        if (sliderRef.current) {
            containerWidth = sliderRef.current.getBoundingClientRect().width;
        }

        if (elementsTotalWidth <= containerWidth) {
            return 0;
        } else {
            const steps = Math.ceil((elementsTotalWidth - containerWidth) / 162);
            console.log(steps);
            return steps;
        }
    }

    const classes = useStyles({ endLeft: handleEndReachLeft(), endRight: handleEndReachRight() });

    return (
        <>
            <SliderTitle>Products from the same category</SliderTitle>
            <Wrapper ref={sliderRef}>
                <ArrowWrapper direction='left' onClick={() => handleCount('left')}>
                    <ArrowLeftOutlined className={classes.arrowLeft}/>
                </ArrowWrapper>
                <Slider distance={count}>
                    {books.map(book => {
                        return <Link to={`/products/${book.product_id}`} key={book.product_id}><Card maximize={false} title={book.title} author={book.author_name} image={book.thumbnail_url}/></Link>
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

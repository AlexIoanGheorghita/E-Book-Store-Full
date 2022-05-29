import React, { useEffect, useState } from 'react';
import ProductSlider from '../components/Slider';
import ProductDetails from '../components/product/ProductDetails';
import ReviewList from '../components/ReviewList';
import { useParams } from 'react-router-dom';
import { axios_ } from '../axios/base_url';

const Product = () => {
    const [rating, setRating] = useState(0.0);
    const [details, setDetails] = useState(null);
    const productId = useParams().productId;

    useEffect(() => {
        loadProductDetails(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    const loadProductDetails = async (id) => {
        try {
            const response = await axios_.get(`/products/${id}`);
            setDetails(response.data);
            calculateRating(response.data.reviews);
        } catch (exception) {
            console.log(exception);
        }
    };

    const calculateRating = (reviewArr) => {
        /* Calculate the average rating, and turn it into a string to access the remainder and whole part */
        let totalRating = 0.0;

        if (reviewArr.length !== 0) {
            totalRating = reviewArr.reduce((accumulator, current) => {
                return accumulator + Number(current.rating);
            }, 0) / reviewArr.length;
        } 

        setRating(totalRating);
    };

    return (
        <>
            {details ? (
                <>
                    <ProductDetails prodDetails={details} rating={rating} />
                    <ProductSlider books={details.related} />
                    <ReviewList setDetails={setDetails} details={details} productId={productId}/>
                </>) : null}
        </>
    )
}

export default Product

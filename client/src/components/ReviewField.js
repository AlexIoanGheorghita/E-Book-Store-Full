import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axios_ } from '../axios/base_url';
import { Error } from '../pages/Publish.styled';
import { Container, Title, Label, Input, Textarea, Button } from './ReviewField.styled';

const ReviewField = ({ setDetails, details, id }) => {
    const buttonRef = useRef();
    const navigate = useNavigate();
    const [review, setReview] = useState({
        title: '',
        description: '',
        rating: null
    });
    const [errors, setErrors] = useState({
        titleErr: '',
        descErr: '',
        rateErr: '',
        defaultErr: ''
    });

    useEffect(() => {
        validate();
        //console.log(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [review]);

    const validate = () => {
        const { title, description, rating } = review;

        if (title && description && Number(rating) >= 1.0) {
            if (buttonRef.current) {
                buttonRef.current.removeAttribute('disabled');
            }
        } else {
            if (buttonRef.current) {
                buttonRef.current.setAttribute('disabled', '');
            }
        }
    }

    const handleDescription = (e) => {
        const summary = e.target.value.trim();
        if (summary) {
            setReview({ ...review, description: summary });
            setErrors({ ...errors, descErr: '' });
        } else {
            setReview({ ...review, description: '' });
            setErrors({ ...errors, descErr: 'Description field is required' });
        }
    }

    const handleTitle = (e) => {
        const title = e.target.value.trim();
        if (title) {
            setReview({ ...review, title: title });
            setErrors({ ...errors, titleErr: '' });
        } else {
            setReview({ ...review, title: '' });
            setErrors({ ...errors, titleErr: 'Title field is required' });
        }
    }

    const handleRating = (e) => {
        const rating = e.target.value.trim();
        if (rating.length >= 1) {
            if (isNaN(rating)) {
                setReview({ ...review, rating: rating });
                setErrors({ ...errors, rateErr: 'Review field needs to be a number' });
            } else {
                setReview({ ...review, rating: rating });
                setErrors({ ...errors, rateErr: '' });
            }
        } else {
            setReview({ ...review, rating: null });
            setErrors({ ...errors, rateErr: 'Rating field is required' });
        }
    }

    const handleFormData = (formValues) => {
        const formData = new FormData();

        formData.append('title', formValues.title);
        formData.append('description', formValues.description);
        formData.append('rating', formValues.rating);

        return formData;
    }

    const handleSubmit = async () => {
        const role = sessionStorage.getItem('role');
        if (role) {
            try {
                console.log(review);
                const response = await axios_.post(`products/${id}/review/${sessionStorage.getItem('id')}`, handleFormData(review));
                if (response) {
                    console.log(response.data);
                    setErrors({});
                    setDetails({ ...details, reviews: [...details.reviews, response.data] });
                    setReview({title: '', description: '', rating: null});
                }
            } catch (err) {
                const newErrors = err.response.data;
                console.log(newErrors);
                setErrors(newErrors);
            }
        } else {
            navigate('/login');
        }
    }

    return (
        <Container>
            <Title>Leave a review:</Title>
            <Label htmlFor='title'>Review Title</Label>
            <Input onChange={handleTitle} id='title' name='title' />
            <Error>{errors.titleErr}</Error>
            <Label htmlFor='message'>Review Message</Label>
            <Textarea onChange={handleDescription} id='message' name='message' />
            <Error>{errors.descErr}</Error>
            <Label htmlFor='rating'>Rating</Label>
            <Input onChange={handleRating} type='number' id='rating' name='rating' min='1.0' max='5.0' step='0.5' />
            <Error>{errors.rateErr}</Error>
            <Button onClick={handleSubmit} ref={buttonRef}>Submit</Button>
            <Error>{errors.defaultErr}</Error>
        </Container>
    )
}

export default ReviewField

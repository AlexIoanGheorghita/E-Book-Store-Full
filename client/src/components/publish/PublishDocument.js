import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, StepNumber, Title, Description } from '../../pages/Publish.styled';
import { PublishContainer, Button } from './PublishDocument.styled';
import { axios_ } from '../../axios/base_url';
import { Error } from '../../pages/Login.styled';
import { CheckCircleSharp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    success: ({success}) => ({
        marginRight: '4px',
        animation: success ? 'appear 0.5s ease-in-out 10s forwards' : 'none'
    }),
    "@keyframes appear": {
        "0%": {
            opacity: 0
        },
        "100%": {
            opacity: 1
        }
    }
});

const PublishDocument = React.forwardRef(({ formValues, dispatch, setClicks }, ref) => {
    const [success, setSuccess] = useState(false);  
    const navigate = useNavigate(); 

    const classes = useStyles({success});

    const handleFormData = (formValues) => {
        const formData = new FormData();

        formData.append('thumbnail', formValues.thumbnail);
        formData.append('document', formValues.document);

        formData.append('title', formValues.title);
        formData.append('author', formValues.author);
        formData.append('summary', formValues.summary);
        formData.append('pages', formValues.pages);
        formData.append('language', formValues.language);
        formData.append('isbn', formValues.isbn);
        formData.append('price', formValues.price);

        return formData;
    }

    const handleClick = () => {
        if (ref.current) {
            if (!ref.current.hasAttribute('disabled')) {
                setClicks(1);
                postFormData().then(response => {
                    console.log(`Response: ${response}`);
                    if (response !== undefined) {
                        navigate('/products/categories/Adventure');
                    }
                }).catch(error => {
                    console.log(`Error: ${error}`);
                    setSuccess(false);
                });
            } else {
                setClicks(0);
            }
        }
    };

    const postFormData = async () => {
        const data = handleFormData(formValues);

        try {
            dispatch({ type: 'setError', name: 'defaultErr', payload: '' });
            setSuccess(true);
            const response = await axios_.post('/document/upload', data);
            console.log(response.data);
            return response.data;
        } catch (err) {
            setSuccess(false);
            const errors = err.response.data;
            if (errors) {
                for (const errorName of Object.keys(errors)) {
                    if (errors[errorName] !== '') {
                        dispatch({ type: 'setError', name: errorName, payload: errors[errorName] });
                    }
                }
            }
        }
    }

    return (
        <Container>
            <StepNumber>
                <span>4</span>
            </StepNumber>
            <PublishContainer>
                <Title>Publish your work</Title>
                <Description>
                    Hooray! You have arrived to the last step before you can see your work listed on the store. 
                    Once you press the button to have your document published, it will first go through a review stage 
                    that should take between 3-5 business days. If everything is alright once the review is complete, you will be notified 
                    and your product will appear on the store.
                </Description>
                <Button type='submit' onClick={handleClick} ref={ref}>{success ? (<><CheckCircleSharp className={classes.success}/>Success</>) : 'Publish'}</Button>
                <Error>{formValues.errors.defaultErr}</Error>
            </PublishContainer>
        </Container>
    )
});

export default PublishDocument;

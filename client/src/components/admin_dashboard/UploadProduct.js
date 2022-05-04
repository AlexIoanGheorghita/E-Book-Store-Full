import { makeStyles } from '@material-ui/core';
import { CheckCircleSharp, Publish, Visibility } from '@material-ui/icons';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { axios_ } from '../../axios/base_url';
import { Error } from '../../pages/Publish.styled';
import Modal from '../publish/Modal';
import { Message } from '../publish/UploadDocument.styled';
import { Wrapper, Container, Label, Input, Textarea, InputWrapper, InputGroup, Button } from './UploadProduct.styled';

const useStyles = makeStyles({
    upload: {
        marginRight: '8px'
    },
    success: {
        marginRight: '4px'
    }
});

const initialState = {
    document: null,
    thumbnail: null,
    title: '',
    author: '',
    summary: '',
    pages: null,
    language: '',
    isbn: 'N/A',
    price: null,
    publisher: '',
    date_published: null,
    errors: {
        docError: '',
        thumbErr: '',
        titleErr: '',
        authErr: '',
        sumErr: '',
        pagErr: '',
        langErr: '',
        isbnErr: '',
        priceErr: '',
        publisherErr: '',
        dateErr: '',
        defaultErr: ''
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'setDocument':
            return { ...state, document: action.payload };
        case 'setThumbnail':
            return { ...state, thumbnail: action.payload };
        case 'setTitle':
            return { ...state, title: action.payload };
        case 'setAuthor':
            return { ...state, author: action.payload };
        case 'setSummary':
            return { ...state, summary: action.payload };
        case 'setPages':
            return { ...state, pages: action.payload };
        case 'setLanguage':
            return { ...state, language: action.payload };
        case 'setIsbn':
            return { ...state, isbn: action.payload };
        case 'setPrice':
            return { ...state, price: action.payload };
        case 'setPublisher':
            return { ...state, publisher: action.payload };
        case 'setDate':
            return { ...state, date_published: action.payload };
        case 'setError':
            return { ...state, errors: {...state.errors, [action.name]: action.payload }};
        case 'setToDefault':
            return initialState;
        default:
            console.log('Nothing selected');
    }
}

const UploadProduct = (props) => {
    const classes = useStyles();
    const buttonRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);  
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        validate();
        console.log(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const handleShow = () => {
        setShowModal(true);
    };

    const handleHide = () => {
        setShowModal(false);
    };

    const validate = () => {
        const { document, thumbnail, title, author, summary, pages, language, isbn, price, publisher, date_published } = state;

        if (document && thumbnail && title && author && summary && pages && language && isbn && (price !== null && Number(price) >= 0) && publisher && (date_published !== null && Number(date_published) <= new Date().getFullYear())) {
            if (buttonRef.current) {
                buttonRef.current.removeAttribute('disabled');
            }
        } else {
            if (buttonRef.current) {
                buttonRef.current.setAttribute('disabled', '');
            }
        }
    }

    const handleDocumentUpload = (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        if (file) { 
            dispatch({ type: 'setDocument', payload: file });
            dispatch({ type: 'setError', name: 'docErr', payload: '' });
        } else {
            dispatch({ type: 'setDocument', payload: null });
            dispatch({ type: 'setError', name: 'docErr', payload: 'Uploading a document is mandatory' });
        }
    }

    const handleThumbnailUpload = (e) => {
        const image = e.target.files[0];
        if (image) {
            dispatch({ type: 'setThumbnail', payload: image });
            dispatch({ type: 'setError', name: 'thumbErr', payload: '' });
        } else {
            dispatch({ type: 'setThumbnail', payload: null });
            dispatch({ type: 'setError', name: 'thumbErr', payload: 'Uploading a cover page is mandatory' });
        }
    }

    const handleTitle = (e) => {
        const title = e.target.value.trim();
        if (title) {
            dispatch({ type: 'setTitle', payload: title });
            dispatch({ type: 'setError', name: 'titleErr', payload: '' });
        } else {
            dispatch({ type: 'setTitle', payload: '' });
            dispatch({ type: 'setError', name: 'titleErr', payload: 'Title field is required' });
        }
    }

    const handleAuthor = (e) => {
        const author = e.target.value.trim();
        if (author) {
            dispatch({ type: 'setAuthor', payload: author });
            dispatch({ type: 'setError', name: 'authErr', payload: '' });
        } else {
            dispatch({ type: 'setAuthor', payload: '' });
            dispatch({ type: 'setError', name: 'authErr', payload: 'Author field is required' });
        }
    }

    const handleSummary = (e) => {
        const summary = e.target.value.trim();
        if (summary) {
            dispatch({ type: 'setSummary', payload: summary });
            dispatch({ type: 'setError', name: 'sumErr', payload: '' });
        } else {
            dispatch({ type: 'setSummary', payload: '' });
            dispatch({ type: 'setError', name: 'sumErr', payload: 'Summary field is required' });
        }
    }

    const handlePages = (e) => {
        const pages = e.target.value.trim();
        if (pages) {
            if (isNaN(pages)) {
                dispatch({ type: 'setPages', payload: Number(pages) });
                dispatch({ type: 'setError', name: 'pagErr', payload: 'Pages field needs to contain only numbers' });
            } else {
                dispatch({ type: 'setPages', payload: Number(pages) });
                dispatch({ type: 'setError', name: 'pagErr', payload: '' });
            }
        } else {
            dispatch({ type: 'setPages', payload: null });
            dispatch({ type: 'setError', name: 'pagErr', payload: 'Pages field is required' });
        }
    }

    const handleLanguage = (e) => {
        const lang = e.target.value.trim();
        if (lang) {
            dispatch({ type: 'setLanguage', payload: lang });
            dispatch({ type: 'setError', name: 'langErr', payload: '' });
        } else {
            dispatch({ type: 'setLanguage', payload: '' });
            dispatch({ type: 'setError', name: 'langErr', payload: 'Language field is required' });
        }
    }

    const handleIsbn = (e) => {
        const isbn = e.target.value.trim();
        if (isbn) {
            dispatch({ type: 'setIsbn', payload: isbn });
            dispatch({ type: 'setError', name: 'isbnErr', payload: '' });
        } else {
            dispatch({ type: 'setIsbn', payload: '' });
            dispatch({ type: 'setError', name: 'isbnErr', payload: 'ISBN field is required' });
        }
    }

    const handlePrice = (e) => {
        const price = e.target.value.trim();
        if (price.length >= 1) {
            if (isNaN(price)) {
                dispatch({ type: 'setPrice', payload: price });
                dispatch({ type: 'setError', name: 'priceErr', payload: 'Price field needs to contain only numbers' });
            } else {
                dispatch({ type: 'setPrice', payload: price });
                dispatch({ type: 'setError', name: 'priceErr', payload: '' });
            }
        } else {
            dispatch({ type: 'setPrice', payload: null }); // BE CAREFUL: ("" == false) and (0 == false) IS true;
            dispatch({ type: 'setError', name: 'priceErr', payload: 'Price field is required' });
        }
    }

    const handlePublisher = (e) => {
        const publisher = e.target.value.trim();
        if (publisher) {
            dispatch({ type: 'setPublisher', payload: publisher });
            dispatch({ type: 'setError', name: 'publisherErr', payload: '' });
        } else {
            dispatch({ type: 'setPublisher', payload: '' });
            dispatch({ type: 'setError', name: 'publisherErr', payload: 'Pulisher field is required' });
        }
    }

    const handleDate = (e) => {
        const date = e.target.value.trim();
        if (date) {
            if (Number(date) > 1920 && Number(date) <= Number(new Date().getFullYear())) {
                dispatch({ type: 'setDate', payload: date });
                dispatch({ type: 'setError', name: 'dateErr', payload: '' });
            } else {
                dispatch({ type: 'setDate', payload: date });
                dispatch({ type: 'setError', name: 'dateErr', payload: 'Published date needs to be a year in the past' });
            }
        } else {
            dispatch({ type: 'setDate', payload: null });
            dispatch({ type: 'setError', name: 'dateErr', payload: 'Published date field is required' });
        }
    }

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
        formData.append('date', formValues.date_published);
        formData.append('publisher', formValues.publisher);

        return formData;
    }

    const handleSubmit = async () => {
        try {
            console.log(state);
            const response = await axios_.put(`admin/products/new`, handleFormData(state));
            if (response) {
                setSuccess(true);
                console.log(response.data);
                setTimeout(() => {
                    dispatch({ type: 'setToDefault' });
                }, 1500);
            }
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
        <Wrapper visibleSub={props.visibleSub}>
            <Container>
                <InputWrapper>
                    <InputGroup>
                        <Label htmlFor="title">Title:</Label>
                        <Input onChange={handleTitle} type="text" name="title" id="title"/>
                        <Error>{state.errors.titleErr}</Error>
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="author">Author:</Label>
                        <Input onChange={handleAuthor} type="text" name="author" id="author"/>
                        <Error>{state.errors.authErr}</Error>
                    </InputGroup>
                </InputWrapper>
                <InputWrapper>
                    <InputGroup>
                        <Label htmlFor="publisher">Publisher:</Label>
                        <Input onChange={handlePublisher} type="text" name="publisher" id="publisher"/>
                        <Error>{state.errors.publisherErr}</Error>
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="year">Year of publication:</Label>
                        <Input onChange={handleDate} type="text" name="year" id="year"/>
                        <Error>{state.errors.dateErr}</Error>
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="isbn">ISBN:</Label>
                        <Input onChange={handleIsbn} type="text" name="isbn" id="isbn"/>
                        <Error>{state.errors.isbnErr}</Error>
                    </InputGroup>
                </InputWrapper>
                <InputWrapper>
                    <InputGroup>
                        <Label htmlFor="language">Language:</Label>
                        <Input onChange={handleLanguage} type="text" name="language" id="language"/>
                        <Error>{state.errors.langErr}</Error>
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="pages">Nr. of pages:</Label>
                        <Input onChange={handlePages} type="text" name="pages" id="pages"/>
                        <Error>{state.errors.pagErr}</Error>
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="pages">Price:</Label>
                        <Input onChange={handlePrice} type="text" name="price" id="price"/>
                        <Error>{state.errors.priceErr}</Error>
                    </InputGroup>
                </InputWrapper>
                <InputWrapper>
                    <InputGroup>
                        <Label htmlFor="description">Description:</Label>
                        <Textarea onChange={handleSummary} type="text" name="description" id="description"/>
                        <Error>{state.errors.sumErr}</Error>
                    </InputGroup>
                    <InputGroup>
                        <p>The only accepted type for the document is '.PDF'.</p>
                        <input onChange={handleDocumentUpload} type="file" name="inputFile" id="inputFile" accept=".pdf" required />
                        <Label htmlFor="inputFile"><Publish className={classes.upload}/>Upload a document</Label>
                        <Error>{state.errors.docErr}</Error>
                        <Message>{state.document !== null ? state.document.name : ''}</Message>
                        <input onChange={handleThumbnailUpload} type="file" name="inputCover" id="inputCover" accept=".png, .jpg, .jpeg" required />
                        <Label htmlFor="inputCover"><Publish className={classes.upload}/>Upload cover page</Label>
                        <Error>{state.errors.thumbErr}</Error>
                        <Message>{state.thumbnail !== null ? state.thumbnail.name : ''}</Message>
                        <Button onClick={handleShow}><Visibility className={classes.upload}/>Preview</Button>
                    </InputGroup>
                </InputWrapper>
                <Button ref={buttonRef} onClick={handleSubmit}>{success ? (<><CheckCircleSharp className={classes.success}/>Success</>) : 'Submit'}</Button>
                <Error>{state.errors.defaultErr}</Error>
            </Container>
            <Modal maximize={false} show={showModal} closeModal={handleHide} docDetails={state}/>
        </Wrapper>
    )
};

export default UploadProduct;

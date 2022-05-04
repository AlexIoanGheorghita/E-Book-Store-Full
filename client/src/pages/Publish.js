import React, { useEffect, useReducer, useState } from 'react';
import { Wrapper } from './Publish.styled';
import ProgressBar from '../components/publish/ProgressBar';
import UploadDocument from '../components/publish/UploadDocument';
import DocumentDetails from '../components/publish/DocumentDetails';
import PreviewDocument from '../components/publish/PreviewDocument';
import PublishDocument from '../components/publish/PublishDocument';

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
        case 'setError':
            return { ...state, errors: {...state.errors, [action.name]: action.payload }}
        default:
            console.log('Nothing selected');
    }
}

const Publish = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [progress, setProgress] = useState(0);
    const [clicks, setClicks] = useState(0);
    const [submitClicks, setSubmitClicks] = useState(0);
    const buttonRef = React.createRef();
    const previewRef = React.createRef();

    useEffect(() => {
        handleProgress();
        validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, clicks, submitClicks]);
    

    const handleProgress = () => {
        if (state.document && state.thumbnail) {
            setProgress(1);
            if (state.title && state.author && state.summary && state.pages && state.language && state.isbn && state.price) {
                setProgress(2);
                if (clicks === 1) {
                    setProgress(3);
                    if (submitClicks === 1) {
                        setProgress(4);
                    } else {
                        setProgress(3);
                    }
                } else {
                    setProgress(2);
                }
            } else {
                setProgress(1);
            }
        } else {
            setProgress(0);
        }
    }

    const validate = () => {
        const { document, thumbnail, title, author, summary, pages, language, isbn, price } = state;

        if (document && thumbnail && title && author && summary && pages && language && isbn && (price !== null && Number(price) >= 0)) {
            if (previewRef.current) {
                previewRef.current.removeAttribute('disabled');

                if (clicks === 1) {
                    if (buttonRef.current) {
                        buttonRef.current.removeAttribute('disabled');
                    }
                } else {
                    setSubmitClicks(0);
                    if (buttonRef.current) {
                        buttonRef.current.setAttribute('disabled', '');
                    }
                }
            }
        } else {
            setClicks(0);
            if (previewRef.current) {
                previewRef.current.setAttribute('disabled', '');
            }
            if (buttonRef.current) {
                buttonRef.current.setAttribute('disabled', '');
            }
        }
    }

    const handleDocumentUpload = (e) => {
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

        /* --- The code below works for when there is a commma-separated list of authors --- */
        // DO NOT DELETE!!!

        // if (arr.length > 1) {
        //     const arrayOfNames = [];
        //     for (let elem of arr) {
        //         elem = elem.trim();
        //         const firstName = elem.split(' ')[0];
        //         const lastName = elem.split(' ')[1];
        //         arrayOfNames.push({ firstName, lastName });
        //     }
        //     dispatch({ type: 'setAuthor', payload: arrayOfNames });
        //     dispatch({ type: 'setError', name: 'authErr', payload: '' });
        // } else {
        //     author = author.trim();
        //     const firstName = author.split(' ')[0];
        //     const lastName = author.split(' ')[1];
        //     if (author) {
        //         dispatch({ type: 'setAuthor', payload: [{firstName, lastName}] });
        //         dispatch({ type: 'setError', name: 'authErr', payload: '' });
        //     } else {
        //         dispatch({ type: 'setAuthor', payload: [] });
        //         dispatch({ type: 'setError', name: 'authErr', payload: 'Author field is required' });
        //     }
        // }
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

    return (
        <Wrapper>
            <ProgressBar progress={progress}/>
            <UploadDocument 
                handleDocument={handleDocumentUpload} 
                doc={state.document} 
                handleThumbnail={handleThumbnailUpload} 
                image={state.thumbnail}
                errors={[state.errors.docErr, state.errors.thumbErr]}
            />
            <DocumentDetails 
                handleTitle={handleTitle} 
                handleAuthor={handleAuthor} 
                handleSummary={handleSummary}
                handlePages={handlePages}
                handleLanguage={handleLanguage}
                handleIsbn={handleIsbn}
                handlePrice={handlePrice}
                errors={[state.errors.titleErr, state.errors.authErr, state.errors.sumErr, state.errors.pagErr, state.errors.langErr, state.errors.isbnErr, state.errors.priceErr]}
            />
            <PreviewDocument ref={previewRef} setClicks={setClicks} details={{
                thumbnail: state.thumbnail,
                title: state.title,
                author: state.author,
                summary: state.summary,
                pages: state.pages,
                language: state.language,
                isbn: state.isbn,
                price: state.price
            }}/>
            <PublishDocument ref={buttonRef} progress={progress} dispatch={dispatch} formValues={state} clicks={submitClicks} setClicks={setSubmitClicks}/>
        </Wrapper>
    )
};

export default Publish;

import { makeStyles } from '@material-ui/core';
import { Close, Publish, Visibility } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { ViewWindow, ModalContainer, Container, Label, Input, Textarea, InputWrapper, InputGroup, Button} from './ViewModal.styled';
import { FileInput } from './EditModal.styled';
import Modal from '../publish/Modal';
import { Error } from '../../pages/Publish.styled';
import { Message } from '../publish/UploadDocument.styled';
import { axios_ } from '../../axios/base_url';

const useStyles = makeStyles({
    close: {
        width: '30px',
        height: '30px'
    },
    upload: {
        marginRight: '8px'
    }
});

const EditModal = ({ show, closeModal, details }) => {
    const classes = useStyles();
    const buttonRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState({
        document: details.document_url,
        thumbnail: details.thumbnail_url,
        title: details.title,
        author: details.authors,
        summary: details.description,
        pages: details.num_pages,
        language: details.language,
        isbn: details.isbn.split('-').join(''),
        price: details.price,
        publisher: details.publisher,
        date_published: details.date_published,
        documentName: details.document_url,
        thumbnailName: details.thumbnail_url
    });
    const [errors, setErrors] = useState({
        docErr: '',
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
    });

    useEffect(() => {
        validate();
        //console.log(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    const handleShow = () => {
        setShowModal(true);
    };

    const handleHide = () => {
        setShowModal(false);
    };

    const validate = () => {
        const { document, thumbnail, title, author, summary, pages, language, isbn, price, publisher, date_published } = product;

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
        const file = e.target.files[0];
        if (file) { 
            setProduct({ ...product, document: file, documentName: file.name });
            setErrors({ ...errors, docErr: '' });
        } else {
            setProduct({ ...product, document: null, documentName: '' });
            setErrors({ ...errors, docErr: 'Uploading a document is required' });
        }
    }

    const handleThumbnailUpload = (e) => {
        const image = e.target.files[0];
        if (image) {
            setProduct({ ...product, thumbnail: image, thumbnailName: image.name });
            setErrors({ ...errors, thumbErr: '' });
        } else {
            setProduct({ ...product, thumbnail: null, thumbnailName: '' });
            setErrors({ ...errors, thumbErr: 'Uploading a cover page is required' });
        }
    }

    const handleTitle = (e) => {
        const title = e.target.value.trim();
        if (title) {
            setProduct({ ...product, title: title });
            setErrors({ ...errors, titleErr: '' });
        } else {
            setProduct({ ...product, title: '' });
            setErrors({ ...errors, titleErr: 'Title field is required' });
        }
    }

    const handleAuthor = (e) => {
        const author = e.target.value;
        if (author) {
            setProduct({ ...product, author: author });
            setErrors({ ...errors, authErr: '' });
        } else {
            setProduct({ ...product, author: '' });
            setErrors({ ...errors, authErr: 'Author field is required' });
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
            setProduct({ ...product, summary: summary });
            setErrors({ ...errors, sumErr: '' });
        } else {
            setProduct({ ...product, summary: '' });
            setErrors({ ...errors, sumErr: 'Summary field is required' });
        }
    }

    const handlePages = (e) => {
        const pages = e.target.value.trim();
        if (pages) {
            if (isNaN(pages)) {
                setProduct({ ...product, pages: Number(pages) });
                setErrors({ ...errors, pagErr: 'Pages field needs to contain only numbers' });
            } else {
                setProduct({ ...product, pages: Number(pages) });
                setErrors({ ...errors, pagErr: '' });
            }
        } else {
            setProduct({ ...product, pages: '' });
            setErrors({ ...errors, pagErr: 'Pages field is required' });
        }
    }

    const handleLanguage = (e) => {
        const lang = e.target.value.trim();
        if (lang) {
            setProduct({ ...product, language: lang });
            setErrors({ ...errors, langErr: '' });
        } else {
            setProduct({ ...product, language: '' });
            setErrors({ ...errors, langErr: 'Language field is required' });
        }
    }

    const handleIsbn = (e) => {
        const isbn = e.target.value.trim();
        if (isbn) {
            setProduct({ ...product, isbn: isbn });
            setErrors({ ...errors, isbnErr: '' });
        } else {
            setProduct({ ...product, isbn: '' });
            setErrors({ ...errors, isbnErr: 'ISBN field is required' });
        }
    }

    const handlePrice = (e) => {
        const price = e.target.value.trim();
        if (price.length >= 1) {
            if (isNaN(price)) {
                setProduct({ ...product, price: price });
                setErrors({ ...errors, priceErr: 'Price field needs to be a number' });
            } else {
                setProduct({ ...product, price: price });
                setErrors({ ...errors, priceErr: '' });
            }
        } else {
            setProduct({ ...product, price: null });
            setErrors({ ...errors, priceErr: 'Price field is required' });
        }
    }

    const handlePublisher = (e) => {
        const publisher = e.target.value.trim();
        if (publisher) {
            setProduct({ ...product, publisher: publisher });
            setErrors({ ...errors, publisherErr: '' });
        } else {
            setProduct({ ...product, publisher: '' });
            setErrors({ ...errors, publisherErr: 'Publisher field is required' });
        }
    }

    const handleDate = (e) => {
        const date = e.target.value.trim();
        if (date) {
            if (Number(date) > 1920 && Number(date) <= Number(new Date().getFullYear())) {
                setProduct({ ...product, date_published: date });
                setErrors({ ...errors, dateErr: '' });
            } else {
                setProduct({ ...product, date_published: date });
                setErrors({ ...errors, dateErr: 'Published date needs to be a year in the past' });
            }
        } else {
            setProduct({ ...product, date_published: null });
            setErrors({ ...errors, dateErr: 'Date published field is required' });
        }
    }

    const handleFormData = (formValues) => {
        const formData = new FormData();

        formData.append('thumbnail', formValues.thumbnail);
        formData.append('document', formValues.document);
        formData.append('thumbnailName', formValues.thumbnailName);
        formData.append('documentName', formValues.documentName);

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
            console.log(product);
            const response = await axios_.put(`admin/products/existing/${details.product_id}`, handleFormData(product));
            if (response) {
                console.log(response.data);
                setErrors({});
                // setTimeout(() => {
                //     closeModal();
                // }, 1500);
            }
        } catch (err) {
            const newErrors = err.response.data;
            console.log(newErrors);
            setErrors(newErrors);
            // if (newErrors) {
            //     for (const errorName of Object.keys(newErrors)) {
            //         //console.log(`${errorName}: ${newErrors[errorName] !== ''}`);
            //         if (newErrors[errorName] !== '') {
            //             setErrors({ ...errors, [errorName]: newErrors[errorName] });
            //             console.log(errors);
            //         }
            //     }
            // }
            //console.log(errors);
        }
    }

    return (
        <ModalContainer visible={show}>
            <span className='close'><Close onClick={closeModal} className={classes.close}/></span>
            <ViewWindow>
                {details !== undefined ? 
                <Container>
                    <InputWrapper>
                        <InputGroup>
                            <Label htmlFor="title">Title:</Label>
                            <Input onChange={handleTitle} type="text" name="title" id="title" value={product.title}/>
                            <Error>{errors.titleErr}</Error>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="author">Author:</Label>
                            <Input onChange={handleAuthor} type="text" name="author" id="author" value={product.author}/>
                            <Error>{errors.authErr}</Error>
                        </InputGroup>
                    </InputWrapper>
                    <InputWrapper>
                        <InputGroup>
                            <Label htmlFor="publisher">Publisher:</Label>
                            <Input onChange={handlePublisher} type="text" name="publisher" id="publisher" value={product.publisher}/>
                            <Error>{errors.publisherErr}</Error>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="year">Year of publication:</Label>
                            <Input onChange={handleDate} type="text" name="year" id="year" value={product.date_published}/>
                            <Error>{errors.dateErr}</Error>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="isbn">ISBN:</Label>
                            <Input onChange={handleIsbn} type="text" name="isbn" id="isbn" value={product.isbn}/>
                            <Error>{errors.isbnErr}</Error>
                        </InputGroup>
                    </InputWrapper>
                    <InputWrapper>
                        <InputGroup>
                            <Label htmlFor="language">Language:</Label>
                            <Input onChange={handleLanguage} type="text" name="language" id="language" value={product.language}/>
                            <Error>{errors.langErr}</Error>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="pages">Nr. of pages:</Label>
                            <Input onChange={handlePages} type="text" name="pages" id="pages" value={product.pages}/>
                            <Error>{errors.pagErr}</Error>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="pages">Price:</Label>
                            <Input onChange={handlePrice} type="text" name="price" id="price" value={product.price} />
                            <Error>{errors.priceErr}</Error>
                        </InputGroup>
                    </InputWrapper>
                    <InputWrapper>
                        <InputGroup>
                            <Label htmlFor="description">Description:</Label>
                            <Textarea onChange={handleSummary} type="text" name="description" id="description" value={product.summary}/>
                            <Error>{errors.sumErr}</Error>
                        </InputGroup>
                        <InputGroup>
                            <p>The only accepted document type is '.PDF'.</p>
                            <FileInput onChange={handleDocumentUpload} type="file" name="inputFile" id="inputFile"></FileInput>
                            <Label htmlFor="inputFile"><Publish className={classes.upload}/>Upload document</Label>
                            <Error>{errors.docErr}</Error>
                            <Message>{product.documentName}</Message>
                            <FileInput onChange={handleThumbnailUpload} type="file" name="inputCover" id="inputCover"></FileInput>
                            <Label htmlFor="inputCover"><Publish className={classes.upload}/>Upload cover page</Label>
                            <Error>{errors.thumbErr}</Error>
                            <Message>{product.thumbnailName}</Message>
                            <Button onClick={handleShow}><Visibility className={classes.upload}/>Preview</Button>
                        </InputGroup>
                    </InputWrapper>
                    <Button ref={buttonRef} onClick={handleSubmit}>Submit</Button>
                    <Error>{errors.defaultErr}</Error>
                </Container>
                : <></>}
            </ViewWindow>
            <Modal maximize={true} show={showModal} closeModal={handleHide} docDetails={details}/>
        </ModalContainer>
    )
};

export default EditModal;
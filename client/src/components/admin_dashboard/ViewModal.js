import { makeStyles } from '@material-ui/core';
import { Close, Visibility } from '@material-ui/icons';
import React from 'react';
import { ViewWindow, ModalContainer, Container, Label, Input, Textarea, InputWrapper, InputGroup, Button} from './ViewModal.styled';
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

const ViewModal = ({ show, closeModal, details }) => {
    const classes = useStyles();

    const handleClick = async (e) => {
        const type = e.target.getAttribute('data-name');
        
        try {
            const response = await axios_.get(`/admin/products/awaiting/${details.product_id}/${type}`);
            console.log(response.data.blobURL);
            window.location.href = response.data.blobURL;
        } catch (err) {
            console.log(err);
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
                            <Input type="text" name="title" id="title" value={details.title} readOnly/>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="author">Author:</Label>
                            <Input type="text" name="author" id="author" value={details.author_name} readOnly/>
                        </InputGroup>
                    </InputWrapper>
                    <InputWrapper>
                        <InputGroup>
                            <Label htmlFor="publisher">Publisher:</Label>
                            <Input type="text" name="publisher" id="publisher" value={details.publisher} readOnly/>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="year">Year of publication:</Label>
                            <Input type="text" name="year" id="year" value={details.date_published} readOnly/>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="isbn">ISBN:</Label>
                            <Input type="text" name="isbn" id="isbn" value={details.isbn} readOnly/>
                        </InputGroup>
                    </InputWrapper>
                    <InputWrapper>
                        <InputGroup>
                            <Label htmlFor="language">Language:</Label>
                            <Input type="text" name="language" id="language" value={details.language} readOnly/>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="pages">Nr. of pages:</Label>
                            <Input type="text" name="pages" id="pages" value={details.num_pages} readOnly/>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="pages">Price:</Label>
                            <Input type="text" name="price" id="price" value={details.price} readOnly/>
                        </InputGroup>
                    </InputWrapper>
                    <InputWrapper>
                        <InputGroup>
                            <Label htmlFor="description">Description:</Label>
                            <Textarea type="text" name="description" id="description" value={details.description} readOnly/>
                        </InputGroup>
                        <InputGroup>
                            <p>The only accepted document type is '.PDF'.</p>
                            <Button data-name="document" onClick={handleClick}><Visibility className={classes.upload}/>View document</Button>
                            <Button data-name="thumbnail" onClick={handleClick}><Visibility className={classes.upload}/>View cover page</Button>
                        </InputGroup>
                    </InputWrapper>
                </Container>
                : <></>}
            </ViewWindow>
        </ModalContainer>
    )
};

export default ViewModal;

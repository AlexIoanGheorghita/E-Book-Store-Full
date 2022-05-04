import { Publish } from '@material-ui/icons';
import React from 'react';
import { UploadContainer, Label, Input, InputWrapper, InputGroup, Message } from './UploadDocument.styled';
import { Container, StepNumber, Title, Description, Error } from '../../pages/Publish.styled';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    upload: {
        marginRight: '8px'
    }
}); 

const UploadDocument = ({ handleDocument, handleThumbnail, doc, image, errors }) => {
    const classes = useStyles();

    return (
        <Container>
            <StepNumber>
                <span>1</span>
            </StepNumber>
            <UploadContainer>
                <Title>Upload document</Title>
                <Description>
                    The first step in your self-publishing journey is to
                    have a final version of your work, which needs to have been
                    previously written in a word processing software. 
                </Description>
                <p>Before you upload, make sure:</p>
                <ul>
                    <li>You have checked both grammar and spelling of your document</li>
                    <li>
                        You have a well defined structure for your literary work, which includes but is not limited to: 
                        a preface, an introduction, main chapters and subchapters
                    </li>
                    <li>All the formatting has been properly carried out and you are satisfied with the look and feel of your document</li>
                </ul>
                <p>The only accepted document type is '.PDF'.</p>
                <InputWrapper>
                    <InputGroup>
                        <Input onChange={handleDocument} type="file" name="inputFile" id="inputFile" required></Input>
                        <Label htmlFor="inputFile"><Publish className={classes.upload}/>Upload a document</Label>
                        <Error>{errors[0]}</Error>
                    </InputGroup>
                    <Message>{doc && doc.name}</Message>
                </InputWrapper>
                <p className='inputCover-label'>The only accepted image formats are '.PNG, .JPEG or .JPG'.</p>
                <InputWrapper>
                    <InputGroup>
                        <Input onChange={handleThumbnail} type="file" name="inputCover" id="inputCover" accept=".png, .jpg, .jpeg" required></Input>
                        <Label htmlFor="inputCover"><Publish className={classes.upload}/>Upload cover page</Label>
                        <Error>{errors[1]}</Error>
                    </InputGroup>
                    <Message>{image && image.name}</Message>
                </InputWrapper>
            </UploadContainer>
        </Container>
    )
};

export default UploadDocument;

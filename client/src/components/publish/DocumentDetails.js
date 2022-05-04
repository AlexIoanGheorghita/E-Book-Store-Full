import React from 'react';
import { Container, StepNumber, Title, Description, Error } from '../../pages/Publish.styled';
import { DetailsContainer, Input, Label, InputGroup, Textarea } from './DocumentDetails.styled';
 
const DocumentDetails = ({ handleTitle, handleAuthor, handleSummary, handlePages, handleLanguage, handleIsbn, handlePrice, errors }) => {

    return (
        <Container>
            <StepNumber>
                <span>2</span>
            </StepNumber>
            <DetailsContainer>
                <Title>Fill in details</Title>
                <Description>
                    The next step you need to take is to choose the type of document you wish to publish (such as 'E-Book', for example)
                    as well as fill in all the necessary details for your work, so as to make your document
                    unique and easily recognizable for other people. Depending on the type of document,
                    you may have to fill in more or less details.
                </Description>
                <InputGroup>
                    <Label htmlFor="titleInput">Title of the document</Label>
                    <Input onChange={handleTitle} type="text" name="titleInput" id="titleInput" required></Input>
                    <Error>{errors[0]}</Error>
                    <Label htmlFor="authorInput">Your first and last name, separared by a space</Label>
                    <Input onChange={handleAuthor} type="text" name="authorInput" id="authorInput" required></Input>
                    <Error>{errors[1]}</Error>
                    <Label htmlFor="description">Summary of what the document is about</Label>
                    <Textarea onChange={handleSummary} type="text" name="description" id="description" required></Textarea>
                    <Error>{errors[2]}</Error>
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="pages">Number of pages</Label>
                    <Input onChange={handlePages} type="text" name="pages" id="pages" required></Input>
                    <Error>{errors[3]}</Error>
                    <Label htmlFor="languageInput">Language (English or Romanian. Currently, other languages are not supported)</Label>
                    <Input onChange={handleLanguage} type="text" name="languageInput" id="languageInput" required></Input>
                    <Error>{errors[4]}</Error>
                    <Label htmlFor="isbnInput">ISBN (only fill in this field if you have procured a valid ISBN from an authorized entity)</Label>
                    <Input onChange={handleIsbn} type="text" name="isbnInput" id="isbnInput" required></Input>
                    <Error>{errors[5]}</Error>
                    <Label htmlFor="priceInput">Selling price </Label>
                    <Input onChange={handlePrice} type="text" name="priceInput" id="priceInput" required></Input>
                    <Error>{errors[6]}</Error>
                </InputGroup>
            </DetailsContainer>
        </Container>
    )
};

export default DocumentDetails;

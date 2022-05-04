import React from 'react';
import { Container, Title, Label, Input, Textarea, Rating, Button } from './ReviewField.styled';

const ReviewField = () => {
    return (
        <Container>
            <Title>Leave a review:</Title>
            <Label htmlFor='title'>Review Title</Label>
            <Input id='title' name='title'></Input>
            <Label htmlFor='message'>Review Message</Label>
            <Textarea id='message' name='message'></Textarea>
            <Rating></Rating>
            <Button>Submit</Button>
        </Container>
    )
}

export default ReviewField

import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: 0 0 10px 66px;
`

export const Title = styled.p`
    margin: 0 0 20px 0;
    font-size: 1.8rem;
    font-family: ${({theme}) => theme.font.headings};
`

export const Label = styled.label`
    font-family: ${({theme}) => theme.font.paragraphs};
    margin-bottom: 5px;
`

export const Input = styled.input`
    padding: 5px;
    margin-bottom: 10px;
    font-size: 1rem;
    border: 1.5px solid ${({theme}) => theme.colors.bgVeryLightGrey};;
    background-color: ${({theme}) => theme.colors.bgVeryLightGrey};
    transition: border-color 0.3s ease;

    &:focus {
        border-color: ${({theme}) => theme.colors.textMediumGrey};
        outline: none;
    }
`

export const Textarea = styled.textarea`
    resize: vertical;
    padding: 5px;
    margin-bottom: 10px;
    font-size: 1rem;
    height: 150px;
    border: 1.5px solid ${({theme}) => theme.colors.bgVeryLightGrey};;
    background-color: ${({theme}) => theme.colors.bgVeryLightGrey};
    transition: border-color 0.3s ease;

    &:focus {
        border-color: ${({theme}) => theme.colors.textMediumGrey};
        outline: none;
    }
`

export const Rating = styled.div`

`

export const Button = styled.button`
    width: 230px;
    height: 35px;
    cursor: pointer;
    background-color: ${({theme}) => theme.colors.buttons};
    border: none;
    font-family: 'Verdana', sans-serif;
    letter-spacing: 0.5px;
    color: ${({theme}) => theme.colors.textVeryDarkGrey};
    transition: width 0.2s ease, height 0.2s ease, font-size 0.2s ease;

    &:hover {
        width: 250px;
        height: 45px;
        font-size: 16px;
    }
`
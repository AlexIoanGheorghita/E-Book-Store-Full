import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: 0 0 10px 66px;
`

export const Title = styled.h2`
    margin: 0 0 20px 0;
    font-size: 1.8rem;
    font-family: ${({theme}) => theme.font.headings2};
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

    &#rating {
        width: 80px;
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

export const Button = styled.button`
    width: 230px;
    height: 35px;
    cursor: pointer;
    background-color: ${({theme}) => theme.colors.darkBlue};
    border: none;
    font-family: ${({theme}) => theme.colors.paragraphs2}, 'Verdana', sans-serif;
    letter-spacing: 1px;
    color: #FFFFFF;
    transition: width 0.2s ease, height 0.2s ease, font-size 0.2s ease;

    &:hover {
        width: 250px;
        height: 45px;
        font-size: 16px;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`
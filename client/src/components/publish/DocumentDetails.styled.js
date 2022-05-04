import styled from "styled-components";

export const DetailsContainer = styled.div`
    width: 100%;
    border-left: 2px solid ${({theme}) => theme.colors.textLightGrey};
    padding-left: 20px;

    & p:nth-child(4) {
        margin-top: 36px;
    }
`

export const Input = styled.input`
    padding: 10px;
    font-size: 1rem;
    border: 1.5px solid ${({theme}) => theme.colors.bgVeryLightGrey};;
    background-color: ${({theme}) => theme.colors.bgVeryLightGrey};
    transition: border-color 0.3s ease;

    &:focus {
        border-color: ${({theme}) => theme.colors.textMediumGrey};
        outline: none;
    }
`

export const Label = styled.label`
    font-family: ${({theme}) => theme.font.paragraphs};
    margin: 20px 0 5px 0;
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;

    & p {
        font-family: ${({theme}) => theme.font.paragraphs};
        margin: 20px 0 5px 0;
    }
`

export const Textarea = styled.textarea`
    padding: 10px;
    height: 200px;
    font-size: 1rem;
    border: 1.5px solid ${({theme}) => theme.colors.bgVeryLightGrey};;
    background-color: ${({theme}) => theme.colors.bgVeryLightGrey};
    transition: border-color 0.3s ease;
    resize: none;

    &:focus {
        border-color: ${({theme}) => theme.colors.textMediumGrey};
        outline: none;
    }
`
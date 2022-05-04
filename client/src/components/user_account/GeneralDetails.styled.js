import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 20px 40px;
    display: ${(props) => props.visible};
`

export const WrappingBox = styled.div`
    height: 100%;
    width: 100%;
    margin-bottom: 30px;
`

export const Title = styled.h2`
    font-family: ${({theme}) => theme.font.headings2};
    font-size: 1.8rem;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const Input = styled.input`
    padding: 10px;
    font-size: 1rem;
    width: 300px;
    border: 1.5px solid ${({theme}) => theme.colors.bgVeryLightGrey};;
    background-color: ${({theme}) => theme.colors.bgVeryLightGrey};
    transition: border-color 0.3s ease;

    &:focus {
        border-color: ${({theme}) => theme.colors.textMediumGrey};
        outline: none;
    }
`

export const Label = styled.label`
    font-family: ${({theme}) => theme.font.paragraphs2};
    margin: 20px 0 5px 0;
    font-weight: 200;
`

export const Button = styled.button`
    width: 200px;
    height: 40px;
    margin: 20px 0 5px 0;
    cursor: pointer;
    background-color: ${({theme}) => theme.colors.darkBlue};
    border: none;
    font-family: ${({theme}) => theme.colors.paragraphs2}, 'Verdana', sans-serif;
    letter-spacing: 1px;
    color: #FFFFFF;

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`
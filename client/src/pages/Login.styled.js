import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    margin: 10% 0;
`

export const LoginDialog = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    box-shadow:  5px 5px 16px rgba(0, 0, 0, 0.1),
                -5px -5px 16px rgba(0, 0, 0, 0.1);
    width: 400px;
    height: auto;
    padding: 50px 20px;
    background-color: #FFFFFF;
`

export const Title = styled.h2`
    margin: 0 auto 10px auto;
    font-size: 2.2em;
    font-family: ${({theme}) => theme.font.headings2};
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 10px auto 10px auto;

    &:last-child {
        margin-bottom: 25px;
    }
`

export const SubGroup = styled.div`
    position: relative;


    & span {
        position: absolute;
        width: 28px;
        height: 2.5px;
        background-color: ${({theme}) => theme.colors.textLightGrey};
        right: 8px;
        top: 50%;
        transform: translate(0, -50%) rotate(-30deg);
        transform-origin: center;
        display: ${(props) => props.visible};
    }
`

export const Label = styled.label`
    font-family: ${({theme}) => theme.font.paragraphs2};
    font-weight: 200;
    font-size: 1em;
    margin-bottom: 5px;
`

export const Input = styled.input`
    padding: 10px;
    font-size: 0.9em;
    width: 100%;
`

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & a {
        text-decoration: underline;
        color: ${({theme}) => theme.colors.textLightGrey};
        font-family: ${({theme}) => theme.font.paragraphs2};
        font-size: 0.75em;
        margin-top: 10px;
        transition: color 0.2s ease;
    }

    & a:hover {
        color: ${({theme}) => theme.colors.textMediumGrey};
    } 
`

export const Button = styled.button`
    width: 60%;
    height: 42px;
    cursor: pointer;
    background-color: ${({theme}) => theme.colors.darkBlue};
    border: none;
    font-family: 'Verdana', sans-serif;
    letter-spacing: 0.5px;
    color: #FFFFFF;

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`

export const ImageWrapper = styled.div`
    position: absolute;
    height: ${(props) => props.height};
    overflow: hidden;
    left: ${(props) => props.position.left};
    top: ${(props) => props.position.top};
    right: ${(props) => props.position.right};
    bottom: ${(props) => props.position.bottom};
    z-index: -1;
`

export const Image = styled.img`
    height: ${(props) => props.height};
`

export const Error = styled.p`
    color: red;
    font-size: 12px;
    display: block;
    padding-top: 5px;

    &.generalErr {
        font-size: 1em;
        padding: ${props => props.visible ? '2px 0 2px 3px' : '0px'};
        margin-bottom: 10px;
        border-left: 3px solid red;
    }
`
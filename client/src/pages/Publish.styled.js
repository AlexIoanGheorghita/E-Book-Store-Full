import styled from "styled-components";

export const Wrapper = styled.div`
    height: auto;
    margin-top: 2rem;
`

/**
 * Styles for general purpose, smaller components, that will be re-used a lot
 */

export const Container = styled.div`
    display: flex;
    height: auto;
    margin: 0 10% 50px 10%;
`

export const StepNumber = styled.div`
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;

    & span {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 1.1rem;
        font-family: ${({theme}) => theme.font.paragraphs};
        background-color: ${({theme}) => theme.colors.textLightGrey};
    }
`

export const Title = styled.h2`
    font-size: 1.8rem;
`

export const Description = styled.p`
    margin: 1rem 0;
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
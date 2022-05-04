import styled from "styled-components";

export const Wrapper = styled.div`
    margin: 4rem 0;
    width: 100%;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const HeroContainer = styled.div`
    position: relative;
    height: 100%;
    width: auto;

    & a {
        color: #000000;
        text-decoration: none;
    }
`

export const Title = styled.h1`
    text-align: center;
    font-size: 5em;
    letter-spacing: 2px;
    font-family: ${({theme}) => theme.font.headings2};
    font-weight: 600;
`

export const Subtitle = styled.h2`
    text-align: center;
    font-size: 2em;
    font-weight: 200;
    letter-spacing: 3px;
    font-family: ${({theme}) => theme.font.paragraphs2};
`

export const HeroImage = styled.img`
    position: relative;
    height: 90%;
    width: auto;
    margin-top: -50px;
    z-index: -1;
`

export const Button = styled.button`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 45px;
    cursor: pointer;
    background-color: transparent;
    border: 2px solid ${({theme}) => theme.colors.darkBlue};
    border-radius: 10px;
    font-family: ${({theme}) => theme.colors.paragraphs2}, 'Verdana', sans-serif;
    font-size: 1rem;
    letter-spacing: 1px;
    color: ${({theme}) => theme.colors.darkBlue};
`
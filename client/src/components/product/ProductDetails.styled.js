import styled from "styled-components";

export const ProductWrapper = styled.div`
    margin: 4rem 66px;
    height: 100%;
    display: flex;
`

export const Section = styled.div`
    flex: 1;
    font-size: 16px;

    &:nth-child(2) {
        padding-left: 2rem;
        display: flex;
        flex-direction: column;
    }
`

export const ImageContainer = styled.div`
    height: 600px;
    display: flex;
    justify-content: flex-end;
`

export const Image = styled.img`
    height: 100%;
`

export const ProductTitle = styled.h3`
    font-size: 1.8em;
    font-family: ${({theme}) => theme.font.headings2};
`

export const ProductAuthor = styled.h4`
    font-size: 1em;
    font-family: ${({theme}) => theme.font.paragraphs};
    font-weight: 300;
    margin: 1rem 0;
`

export const ProductDescription = styled.p`
    font-family: ${({theme}) => theme.font.paragraphs};
    font-weight: 300;
    line-height: 20px;
`

export const AdditionalDetails = styled.ul`
    font-family: ${({theme}) => theme.font.paragraphs};
    font-weight: 300;
    margin: 1rem 0 0 1rem;
`

export const Item = styled.li`
    padding-bottom: 12px;

    & span {
        font-weight: 500;
    }
`

export const Price = styled.p`
    font-family: ${({theme}) => theme.font.headings2};
    font-weight: 600;
    font-size: 1.4em;
    margin: 2rem 0 1rem 0; 
    position: relative;
`

export const Span = styled.span`
    font-size: 0.7em;
    position: absolute;
    top: 1px;
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
`
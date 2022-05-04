import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    height: auto;
    align-items: center;
    margin: 1rem 0;

    &:first-child {
        margin-top: 0;
    }
`

export const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 120px;
    width: 90px;
    margin: 0 1rem;
`

export const Image = styled.img`
    height: 100%;
`

export const Details = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & span {
        font-weight: 500;
        letter-spacing: 0px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    }
`

export const Title = styled.p`
    font-size: 1.2em;
`

export const ProductID = styled.p`
    font-family: ${({theme}) => theme.font.paragraphs};
    font-weight: 300;
    letter-spacing: 1px;
`

export const Price = styled(ProductID)`
    font-weight: 500;
`

export const RemoveButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 25px;
    cursor: pointer;
    font-size: 0.75rem;
    border: 1.5px solid ${({theme}) => theme.colors.underlines};
    border-radius: 5px;
    font-family: 'Verdana', sans-serif;
    letter-spacing: 0.5px;
    color: ${({theme}) => theme.colors.underlines};
    background-color: #FFFFFF;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: ${({theme}) => theme.colors.underlines};
        color: #FFFFFF;
    }
`
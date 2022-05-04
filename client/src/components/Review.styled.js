import styled from "styled-components";

export const Wrapper = styled.div`
    margin: 40px 0;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
`

export const Details = styled.div`
    margin-left: 15px;
`

export const ReviewTitle = styled.h3`
    margin-bottom: 5px;
`

export const User = styled.p`
    font-size: 1em;
    font-family: ${({theme}) => theme.font.paragraphs};
    font-weight: 300;
    margin-top: 5px;
`

export const Message = styled.p`
    margin-top: 10px;
    font-size: 1.1em;
    font-family: ${({theme}) => theme.font.paragraphs};
    font-weight: 300;
    line-height: 22px;
`
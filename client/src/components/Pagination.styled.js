import styled from "styled-components";

export const Wrapper = styled.div`
    height: 50px;
    background-color: ${({theme}) => theme.colors.bgVeryLightGrey};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LeftArrow = styled.a`
    width: 24px;
    height: 24px;
    cursor: pointer;
`

export const RightArrow = styled(LeftArrow)``

export const PageNumber = styled.a`
    width: 24px;
    height: 24px;
    text-align: center;
    cursor: pointer;
    background-color: ${({theme}) => theme.colors.bgVeryLightGrey};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({theme}) => theme.colors.textLightGrey};
    }
`

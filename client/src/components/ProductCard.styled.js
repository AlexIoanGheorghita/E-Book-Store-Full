import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: #FFFFFF;
    height: 300px;
    width: 250px;
    margin: 10px 0;
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    transition: box-shadow 0.3s ease-out;
    cursor: pointer;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -2px;
    }
;
`

export const ImageWrapper = styled.div`
    height: 200px;
    width: 100%;
    display: flex;
    justify-content: center;
`

export const Image = styled.img`
    height: 100%;
`

export const DetailsWrapper = styled.div`
    height: 100px;
    width: 100%;
    position: relative;
`

export const Title = styled.p`
    margin: 5px 10px;
`

export const Author = styled.p`
    margin: 5px 10px;
`

export const Button = styled.button`
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 230px;
    height: 35px;
    cursor: pointer;
    background-color: ${({theme}) => theme.colors.buttons};
    border: none;
    font-family: 'Verdana', sans-serif;
    letter-spacing: 0.5px;
    color: ${({theme}) => theme.colors.textVeryDarkGrey};
    transition: width 0.2s ease, height 0.2s ease, left 0.2s ease, bottom 0.2s ease, font-size 0.2s ease;

    &:hover {
        width: 250px;
        height: 45px;
        left: 0;
        bottom: 0;
        font-size: 16px;
    }
`
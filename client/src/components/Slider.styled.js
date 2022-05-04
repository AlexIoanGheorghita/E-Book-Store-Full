import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    height: auto;
    align-items: center;
    overflow: hidden;
    position: relative;
`

export const Slider = styled.div`
    margin-left: 50px;
    display: flex;
    height: 100%;
    align-items: stretch;
    padding: 15px 0;
    transform: translateX(-${(props) => props.distance*166}px);
    transition: transform 0.4s ease;
`

export const SliderTitle = styled.h2`
    margin: 0 0 10px 66px;
    font-size: 1.8rem;
    font-family: ${({theme}) => theme.font.headings};
`

export const ArrowWrapper = styled.div`
    width: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    position: absolute;
    left: ${(props) => props.direction === 'left' ? '0px' : 'auto'};
    right: ${(props) => props.direction === 'left' ? 'auto' : '0px'};
    z-index: 1;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({theme}) => theme.colors.bgVeryLightGrey};
    }

    &:active {
        background-color: ${({theme}) => theme.colors.textLightGrey};
    }
`
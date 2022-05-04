import styled, { keyframes } from "styled-components";
import { css } from "styled-components/macro";

export const Container = styled.div`
    padding-top: 20px;
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    position: sticky;
    top: 0px;
    z-index: 2;
`

export const Text = styled.p`
    width: 75px;
    text-align: center;
    font-size: 0.8rem;
    position: absolute;
    left: 50%;
    top: -30%;
    transform: translate(-50%, -100%);
`

const animate = keyframes`
    0% {
        background-color: ${({theme}) => theme.colors.textLightGrey};
        height: 24px;
        width: 24px;
    }
    50% {
        background-color: #ffc266;
        height: 28px;
        width: 28px;
    }
    100% {
        background-color: #ffc266;
        height: 24px;
        width: 24px;
    }
`

const animateLine = keyframes`
    to {
        background-position: left;
    }
`

export const Line = styled.span`
    height: 4px;
    width: 80px;
    display: inline-block;
    background-color: #CCCCCC;
    position: relative;
    background: linear-gradient(to left, #cccccc 50%, #ffc266 50%) right;
    background-size: 200%;

    &#first-line {
        animation: ${props => props.progress >= 1 ? css`${animateLine} 1s ease-out 1s forwards` : 'none'};
    }

    &#second-line {
        animation: ${props => props.progress >= 2 ? css`${animateLine} 1s ease-out 1s forwards` : 'none'};
    }

    &#third-line {
        animation: ${props => props.progress >= 3 ? css`${animateLine} 1s ease-out 1s forwards` : 'none'};
    }
`

export const Point = styled.span`
    height: 24px;
    width: 24px;
    position: relative;
    display: inline-block;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors.textLightGrey};

    &#first-checkmark {
        animation: ${props => props.progress >= 1 ? css`${animate} 1s ease-in-out forwards` : 'none'};
    }

    &#second-checkmark {
        animation: ${props => props.progress >= 2 ? css`${animate} 1s ease-in-out forwards` : 'none'};
    }

    &#third-checkmark {
        animation: ${props => props.progress >= 3 ? css`${animate} 1s ease-in-out forwards` : 'none'};
    }

    &#fourth-checkmark {
        animation: ${props => props.progress >= 4 ? css`${animate} 1s ease-in-out forwards` : 'none'};
    }
`
import styled from 'styled-components';

export const ModalContainer = styled.div`
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: #FFFFFF;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
    height: 100%;
    padding: 24px 0;

    display: ${(props) => props.visible ? 'block' : 'none'};

    & span.close {
        display: inline-block;
        position: fixed;
        right: 10px;
        top: 10px;
        color: #000000;
        cursor: pointer;
    }

    & .buttonWrapper {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    & .buttonWrapper button {
        width: 150px;
        padding: 0.2rem 0.4rem 0.2rem 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background: none;
        border-width: 0px;
    }

    & .buttonWrapper button:last-child {
        padding: 0.2rem 0rem 0.2rem 0.4rem;
        justify-content: flex-start;
    }

    & .react-pdf__Page {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 24px
    }

    & .react-pdf__Page canvas {
    }
`

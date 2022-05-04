import styled from "styled-components";

export const ModalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: ${(props) => props.maximize ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.6)'};
    z-index: ${(props) => props.maximize ? 5 : 3};

    display: ${(props) => props.visible ? 'block' : 'none'};

    & span.close {
        display: inline-block;
        position: fixed;
        right: 10px;
        top: 10px;
        color: ${(props) => props.maximize ? '#000000' : '#FFFFFF'};
        cursor: pointer;
    }
`

export const ViewWindow = styled.div`
    position: fixed;
    background: #FFFFFF;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
`
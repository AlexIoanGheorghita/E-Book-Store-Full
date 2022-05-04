import styled from "styled-components";

export const ModalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 3;

    display: ${(props) => props.visible ? 'block' : 'none'};

    & span.close {
        display: inline-block;
        position: fixed;
        right: 10px;
        top: 10px;
        color: #FFFFFF;
        cursor: pointer;
    }
`

export const ViewWindow = styled.div`
    position: fixed;
    background: #FFFFFF;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & p {
        text-align: center;
        margin: 15px;
    }

    & p span.warning {
        color: ${({theme}) => theme.colors.underlines};
    }
`

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
`

export const Button = styled.button`
    font-size: 1rem;
    height: 45px;
    width: 100px;
    padding: 10px;
    border-radius: 10px;
    border: 2px solid #000000;
    background-color: #FFFFFF;
    margin: 0 10px 0 5px;
    cursor: pointer;

    &:focus {
        outline: none;
    }

    &.warningButton {
        background-color: ${({theme}) => theme.colors.underlines};
        border: 2px solid ${({theme}) => theme.colors.underlines};
        color: #FFFFFF;
    }

    &.acceptButton {
        background-color: #6666ff;
        border: #6666ff;
        color: #FFFFFF;
    }
`   
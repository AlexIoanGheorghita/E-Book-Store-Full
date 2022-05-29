import styled from 'styled-components';

export const ViewWindow = styled.div`
    position: fixed;
    background: #FFFFFF;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
` 
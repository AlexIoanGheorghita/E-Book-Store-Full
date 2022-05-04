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
    background: ${({theme}) => theme.colors.bgVeryLightGrey};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: scroll;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px;
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`

export const InputWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    margin: 10px 0;

    & ${InputGroup} {
        margin-right: 10px;
    }
`

export const Label = styled.label`
    margin-bottom: 5px;
`

export const Input = styled.input`
    padding: 10px;
    font-size: 0.9em;
    border: none;
    width: 200px;

    &#title {
        width: 400px;
    }

    &#author {
        width: 250px;
    }

    &#pages, &#price {
        width: 100px;
    }

    &#language {
        width: 200px;
    }
`

export const Button = styled.button`
    width: 200px;
    height: 40px;
    padding: 5px;
    margin-top: 1rem;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    cursor: pointer;
    background-color: ${({theme}) => theme.colors.darkBlue};
    border: none;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;

    &[type='submit'] {
        margin-bottom: 1rem;
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`

export const Textarea = styled.textarea`
    resize: none;
    padding: 10px;
    font-size: 0.9em;
    border: none;
    width: 500px;
    height: 200px;
`
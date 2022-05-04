import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: ${({theme}) => theme.colors.bgVeryLightGrey};
    display: ${(props) => props.visibleSub};
    flex-direction: column;
    width: 100%;
    height: 100%;

    & hr {
        background-color: ${({theme}) => theme.colors.textMediumGrey};
        border: none;
        height: 1px;
        margin: 15px;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px 15px;
    overflow-y: scroll;
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

    &#pages {
        width: 100px;
    }

    &#language {
        width: 200px;
    }
`

// FileInput causes the input elements to not respond to the onChange() event
export const FileInput = styled.input`
    position: absolute;
    width: 0.1px;
    height: 0.1px;
    overflow: hidden;
    z-index: -1;
    opacity: 0;

    & + label {
        margin-top: 1rem;
        display: flex;
        width: 200px;
        height: 40px;
        padding: 5px;
        color: #FFFFFF;
        background-color: ${({theme}) => theme.colors.darkBlue};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
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

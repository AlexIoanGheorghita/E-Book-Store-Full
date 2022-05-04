import styled from "styled-components";

export const UploadContainer = styled.div`
    width: 100%;
    border-left: 2px solid ${({theme}) => theme.colors.textLightGrey};
    padding-left: 20px;

    & ul {
        margin: 1rem 0 1rem 1rem;
    }
`

export const Label = styled.label``

export const Input = styled.input`
    position: absolute;
    width: 0.1px;
    height: 0.1px;
    overflow: hidden;
    z-index: -1;
    opacity: 0;

    & + label {
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

    & ~ p.inputCover-label {
        margin-top: 10px;
    }
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`

export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem 0;

    & ${InputGroup} {
        margin-right: 10px;
    }
`

export const Message = styled.p``
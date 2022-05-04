import styled from 'styled-components';

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
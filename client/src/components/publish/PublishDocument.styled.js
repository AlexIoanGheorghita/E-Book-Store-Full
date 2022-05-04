import styled from "styled-components";

export const PublishContainer = styled.div`
    width: 100%;
    border-left: 2px solid ${({theme}) => theme.colors.textLightGrey};
    padding-left: 20px;
`

export const Button = styled.button`
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 40px;
    padding: 5px;
    color: #FFFFFF;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-size: 1rem;
    background-color: ${({theme}) => theme.colors.darkBlue};
    cursor: pointer;
    border: none;

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`
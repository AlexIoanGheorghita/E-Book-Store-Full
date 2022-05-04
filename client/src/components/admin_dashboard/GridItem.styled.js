import styled from "styled-components";

export const Card = styled.div`
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    margin: 5px 0;
`

export const Field = styled.div`
    flex: 1;
    margin: 15px;
    font-size: 0.9em;

    & button {
        border: none;
        background-color: transparent;
        color: #6666ff;
        cursor: pointer;
        text-decoration: underline;
    }

    &.deleteButton button {
        display: flex;
        align-items: center;
        color: ${({theme}) => theme.colors.underlines};
        text-decoration: none;
    }
`
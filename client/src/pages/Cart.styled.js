import styled from "styled-components";

export const CartContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 4rem 66px;
`

export const CartList = styled.div`
    height: auto;
    display: grid;
    grid-template-columns: auto;
    grid-auto-flow: row;
    grid-auto-rows: auto;
    margin: 0 2rem 0 0;
`

export const PaymentDetails = styled.div`
    height: auto;
    width: 250px;
    margin: 0 0 0 2rem;
    box-shadow:  5px 5px 16px rgba(0, 0, 0, 0.1),
                -5px -5px 16px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    max-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: sticky;
    top: 124px;
`

export const Title = styled.h2`
    & span {
        font-size: 0.9rem;
        color: ${({theme}) => theme.colors.textMediumGrey};
        font-weight: 400;
    }
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`

export const TableRow = styled.tr`
    & td:first-child {
        color: ${({theme}) => theme.colors.textDarkGrey};
        padding: 8px 0;
    }

    & td:last-child {
        font-weight: 500;
        font-size: 1.1rem;
    }
`

export const Button = styled.button`
    width: 100%;
    height: 35px;
    cursor: pointer;
    background-color: ${({theme}) => theme.colors.buttons};
    border: none;
    font-family: 'Verdana', sans-serif;
    letter-spacing: 0.5px;
    color: ${({theme}) => theme.colors.textVeryDarkGrey};
`
import styled from "styled-components";

export const WrapperDash = styled.div`
    display: ${(props) => props.visible};
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 20px 10px;
`

export const Wrapper = styled.div`
    background-color: ${({theme}) => theme.colors.bgVeryLightGrey};
    display: flex;
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

export const FilterOptions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`

export const Results = styled.p`
    margin: 5px 15px;
`

export const FilterContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
`

export const Category = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;

    & p {
        margin: 5px;
    }
`

export const Dropdown = styled.select`
    width: auto;
    margin: 0 5px;
    padding: 10px;
    border: none;
`

export const Option = styled.option`
    padding: 5px;
    border: none;
`

export const SearchWrapper = styled.div`
    margin: 0px 15px;
`

export const SearchField = styled.input`
    position: relative;
    padding: 10px 7px 10px 32px;
    border-radius: 25px;
    border: 1.5px solid #FFFFFF;
    background-color: #FFFFFF;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #000000;
        outline: none;
    }
`

export const Button = styled.button`
    height: 36px;
    width: 72px;
    padding: 10px;
    border: none;
    background-color: #FFFFFF;
    margin: 0 10px 0 5px;

    &:focus {
        outline: none;
    }
`
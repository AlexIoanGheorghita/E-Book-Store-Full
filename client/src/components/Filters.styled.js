import styled from "styled-components";

export const Wrapper = styled.div`
    height: 50px;
    background-color: ${({theme}) => theme.colors.bgVeryLightGrey};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Results = styled.div`
    padding-left: 5px;
`

export const FilterContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const Sort = styled.div`
    margin: 0 5px;
`

export const Option = styled.option`
    padding: 5px;
    border: none;
`

export const SortDropdown = styled.select`
    width: 120px;
    margin: 0 5px;
    padding: 10px;
    border: none;
`

export const Filter = styled.div`

`

export const FilterDropdown = styled(SortDropdown)`

`
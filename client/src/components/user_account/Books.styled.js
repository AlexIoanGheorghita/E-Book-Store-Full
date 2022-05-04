import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100%;
    overflow-y: ${(props) => props.items > 0 ? 'scroll' : 'none'};
    padding: 20px 40px;
    display: ${(props) => props.visible};
`

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 200px;
    grid-auto-flow: row;
    justify-items: start;
`
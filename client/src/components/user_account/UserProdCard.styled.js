import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: #FFFFFF;
    height: 180px;
    width: auto;
    margin: 10px;
    position: relative;
    display: flex;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    transition: box-shadow 0.3s ease-out;
    cursor: pointer;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -2px;
    }
`

export const Image = styled.img`
    height: 100%;
`
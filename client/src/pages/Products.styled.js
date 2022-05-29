import styled from "styled-components";

export const ProductsContainer = styled.div`
    height: auto;
    display: flex;
    margin: 1rem;
`

export const Categories = styled.div`
    background-color: /*${({theme}) => theme.colors.bgLightTan}*/ #FFFFFF;
    padding: 1.2rem 3rem;
    border-radius: 13px;
    color: ${({theme}) => theme.colors.textVeryDarkGrey};
    font-family: ${({theme}) => theme.font.paragraphs};
    letter-spacing: 1px;
    flex: 1;
`

export const Title = styled.h2`
    font-family: ${({theme}) => theme.font.headings};
    font-weight: 700;
    margin-bottom: 1rem;
    font-size: 1.8rem;
`

export const Menu = styled.ul`

`

export const MenuTitle = styled.h3`
    font-weight: 500;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
`

export const SubMenu = styled.ul`
    list-style-type: none;
    font-weight: 400;
    padding-left: 0.6rem;
    height: 0;
    overflow: hidden;
    transition: height 0.5s ease 0.2s;
    margin-bottom: 5px;
`

export const Item = styled.li`
    padding: 5px 0;
    cursor: pointer;
`

export const ProductGrid = styled.div`
    flex: 3.5;
`

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(260px, 300px));
    grid-auto-rows: 320px;
    grid-auto-flow: row;
    justify-items: center;
    /*background-color: ${({theme}) => theme.colors.bgVeryLightGrey};*/

    & a {
        color: #000000;
        text-decoration: none;
    }
`

export const ProductCard = styled.div`
    background-color: #FFFFFF;
    height: 300px;
    width: 250px;
    margin: 10px 0;
`


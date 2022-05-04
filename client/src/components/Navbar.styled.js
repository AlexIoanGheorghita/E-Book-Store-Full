import styled from "styled-components";

export const NavContainer = styled.nav`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const LeftSideNav = styled.div`
    display: flex;
    flex: 1.5;
    margin: 0 10px;
    height: 100%;
`

export const RightSideNav = styled(LeftSideNav)`
    flex: 1;
    display: flex;
    justify-content: flex-end;

    .right {
        float: right;
    }

    & ul li:nth-child(2) {
        padding: 0 10px;
        cursor: none;
    }

    & ul li:nth-child(2)::after {
        display: none;
    }
` 

export const Menu = styled.ul`
    list-style-type: none;
    display: flex;
    align-items: center;

    & a {
        color: #000000;
        text-decoration: none;
    }
`

export const MenuItem = styled.li`
    display: inline-block;
    margin: 0 10px;
    padding: 10px;
    position: relative;
    cursor: pointer;
    font-family: ${({theme}) => theme.font.paragraphs};

    &.search {
        display: flex;
        cursor: auto;
    }

    &.search::after {
        display: none;
    }

    &.shopping-cart, &.profile {
        cursor: auto;
    }

    &.shopping-cart::after, &.profile::after {
        display: none;
    }

    &::after {
        content: "";
        display: block;
        width: 0;
        position: absolute;
        height: 2px;
        left: 0;
        bottom: 0;
        background: ${({theme}) => theme.colors.darkBlue};
        transition: width 0.3s ease;
    }

    &:hover::after {
        width: 100%;
    }
`

export const LogoWrapper = styled.div`
    position: relative;
    display: inline-block;
    margin-right: 10px;
    margin-left: 10px;
    height: 80px;

    &::before {
        content: "";
        display: block;
        position: absolute;
        clip-path: polygon(0 0, 0 100%, 100% 0);
        background-color: ${({theme}) => theme.colors.darkBlue};
        width: 50%;
        height: 20px;
        bottom: -20px;
        left: 0;
    }

    &::after {
        content: "";
        display: block;
        position: absolute;
        clip-path: polygon(100% 100%, 100% 0, 0 0);
        background-color: ${({theme}) => theme.colors.darkBlue};
        width: 50%;
        height: 20px;
        bottom: -20px;
        right: 0;
    }

`

export const Logo = styled.img`
    height: 100%;
`

export const SearchField = styled.input`
    position: relative;
    padding: 10px 7px 10px 32px;
    border-radius: 25px;
    border: 1.5px solid ${({theme}) => theme.colors.bgVeryLightGrey};;
    background-color: ${({theme}) => theme.colors.bgVeryLightGrey};
    transition: border-color 0.3s ease;

    &:focus {
        border-color: ${({theme}) => theme.colors.textMediumGrey};
        outline: none;
    }
`
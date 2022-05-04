import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100vh;
`

export const Container = styled.div`
    display: flex;
    height: 100%;
`

export const DashboardMenu = styled.div`
    height: 100%;
    width: 200px;
    padding: 20px 20px 40px 20px;

    & ul {
        list-style-type: none;
        max-width: 150px;
        margin: 0 auto;
    }

    & ul li {
        padding: 10px 0;
        margin: 6px 0.5rem;
        position: relative;
        cursor: pointer;
        display: inline-block;
        color: #000000;
    }

    & ul li.title {
        cursor: auto;
        font-size: 1.3em;
        font-weight: 500;
        font-family: ${({theme}) => theme.font.paragraphs2};
    }

    & ul :not(li.title)::after {
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

    & ul li:hover::after {
        width: 115%;
    }
`
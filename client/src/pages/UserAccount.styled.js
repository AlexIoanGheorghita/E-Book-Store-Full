import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100vh;
    margin-top: 100px;
    display: flex;
`

export const DetailsMenu = styled.div`
    height: 100%;
    width: 200px;
    padding: 40px 20px;
    border-radius: 0 10px 10px 0;
    box-shadow:  5px 5px 16px rgba(0, 0, 0, 0.1),
                -5px -5px 16px rgba(0, 0, 0, 0.1);
    font-family: ${({theme}) => theme.font.paragraphs2};

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
    }

    & ul li:first-child {
        margin-top: 16px;
    }

    & ul li::after {
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

    & p:nth-child(2) {
        text-align: center;
        margin: 0.5rem 0 0.5rem 0;
        font-weight: 500;
    }

    & p:nth-child(3) {
        text-align: center;
        margin: 0 0 1rem 0;
        font-weight: 300;
        color: ${({theme}) => theme.colors.textMediumGrey};
        font-size: 0.8em;
    }


    & hr {
        background-color: ${({theme}) => theme.colors.textMediumGrey};
        border: none;
        height: 1px;
        margin: 0 15px;
    }
`

export const ProfileImage = styled.div`
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors.bgVeryLightGrey};
    margin: auto;
`

export const Section = styled.section`
    height: auto;
`
import styled from "styled-components";

export const Wrapper = styled.footer`
    display: flex;
    padding: 2rem 0;
`

export const Column = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Logo = styled.h2`

`

export const List = styled.ul`
    list-style-type: none;
`

export const Item = styled.li`
    padding: 2px;
    margin: 5px;
    color: ${({theme}) => theme.colors.textMediumGrey};
    cursor: pointer;
`

export const Title = styled.h3`
    padding: 2px;
    color: ${({theme}) => theme.colors.textVeryDarkGrey};
    font-size: 1.15rem;
    font-weight: 400;
    margin: 5px 5px 5px 5px;
`

export const ListTitle = styled(Title)`
    margin: 5px 5px 5px -5px;
`

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    &:nth-child(1) {
        margin-bottom: 10px;
    } 
`

export const SocialMediaWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`

export const Contact = styled.p`

`

export const Break = styled.p`
    position: relative;
    width: 100%;
    background-color: ${({theme}) => theme.colors.textMediumGrey};
    height: 1px;
    margin: 15px 0 10px 0;
`

export const OverlaySpan = styled.span`
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -60%);
    background-color: #FFFFFF;
    padding: 0 5px;
    color: ${({theme}) => theme.colors.textMediumGrey};
`
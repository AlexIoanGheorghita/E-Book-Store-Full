import styled from "styled-components";

export const Container = styled.div`
    width: 130px;
    margin: 0 1rem;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`

export const ThumbnailContainer = styled.div`
    height: 130px;
    display: flex;
    justify-content: center;
`

export const Thumbnail = styled.img`
    height: 100%;
`

export const TextDetails = styled.div`
    max-height: 170px;
`

export const Title = styled.p`
    text-align: center;
    font-weight: 600;
    font-size: 0.8em;
    margin: 3px 0;
`

export const Author = styled.p`
    text-align: center;
    font-size: 0.7em;
    font-style: italic;
`
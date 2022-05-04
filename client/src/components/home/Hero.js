import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, HeroContainer, Title, Subtitle, Button, HeroImage } from './Hero.styled';

const Hero = () => {
    return (
        <Wrapper>
            <HeroContainer>
                <Title>Thousands of books</Title>
                <Subtitle>at your fingertips</Subtitle>
                <Link to='/categories/fiction'><Button>Categories</Button></Link>
                <HeroImage src={require('../../images/hero_image.png')}/>
            </HeroContainer>
        </Wrapper>
    )
};

export default Hero;

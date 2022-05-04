import { Facebook, Instagram, Twitter } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Wrapper, Logo, Column, Title, List, ListTitle, Item, Section, SocialMediaWrapper, Contact, Break, OverlaySpan } from './Footer.styled';

const useStyles = makeStyles({
    socialFb: {
        cursor: 'pointer',
        '&:hover': {
            color: '#1A74E4'
        }
    },
    socialIg: {
        cursor: 'pointer',
        '&:hover': {
            color: '#3F729B'
        }
    },
    socialTw: {
        cursor: 'pointer',
        '&:hover': {
            color: '#1B9CEA'
        }
    }
});

/* Will appear on every page */

const Footer = () => {

    const classes = useStyles();

    return (
        <Wrapper>
            <Column>
                <Logo>LOGO</Logo>
            </Column>
            <Column>
                <List>
                    <ListTitle>General Details</ListTitle>
                    <Item>Why E-Books?</Item>
                    <Item>Products Information</Item>
                    <Item>FAQ</Item>
                </List>
            </Column>
            <Column>
                <List>
                    <ListTitle>Public Interest</ListTitle>
                    <Item>Terms and Conditions</Item>
                    <Item>Privacy Policy</Item>
                    <Item>Partners</Item>
                    <Item>Careers</Item>
                </List>
            </Column>
            <Column>
                <Section>
                    <Title>Follow us!</Title>
                    <SocialMediaWrapper>
                        <Facebook className={classes.socialFb}/>
                        <Instagram className={classes.socialIg}/>
                        <Twitter className={classes.socialTw}/>
                    </SocialMediaWrapper>
                </Section>
                <Section>
                    <Title>Contact us at:</Title>
                    <Contact>+0 123-456-789</Contact>
                    <Break><OverlaySpan>or</OverlaySpan></Break>
                    <Contact>bookstore@rau.ro</Contact>
                </Section>
            </Column>
        </Wrapper>
    )
}

export default Footer

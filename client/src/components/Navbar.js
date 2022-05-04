import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { PersonOutlined, Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge, makeStyles } from "@material-ui/core";
import { NavContainer, LeftSideNav, RightSideNav, LogoWrapper, Logo, Menu, MenuItem, SearchField } from './Navbar.styled';
import { axios_ } from '../axios/base_url';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllProducts, selectAllProducts } from '../store/cartSlice';

const useStyles = makeStyles(theme => ({
    searchStyle: {
        position: 'absolute',
        marginLeft: '7px',
        zIndex: '2',
        transform: 'translateY(30%)',
        color: '#A6A6A6'
    },
    badge: {
        backgroundColor: '#002060',
        color: '#FFFFFF'
    },
    cart: {
        marginBottom: '0px'
    }
}));

const Navbar = () => {
    let products = useSelector(selectAllProducts);
    const dispatch = useDispatch();
    const classes = useStyles();
    const role = sessionStorage.getItem('role');
    const id = sessionStorage.getItem('id');

    const handleLogout = async () => {
        await dispatch(removeAllProducts());
        sessionStorage.clear();
        try {
            await axios_.get('/api/logout');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <NavContainer>
            <LeftSideNav>
                <LogoWrapper>
                    <Link to='/'>
                        <Logo src={require('../images/logo.png')}/>
                    </Link>
                </LogoWrapper>
                <Menu> 
                    <Link to='/products/categories/Fiction'><MenuItem>Shop</MenuItem></Link>
                    <Link to='/users/publish'><MenuItem>Publish</MenuItem></Link>
                    <MenuItem>Contact</MenuItem>
                    <MenuItem>About</MenuItem>
                </Menu>
            </LeftSideNav>
            <RightSideNav>
                <Menu className='right'>
                    {role ? (role !== 'admin' ? 
                        (<>
                            <MenuItem className="profile"><Link to={`/users/${id}/account`}><PersonOutlined></PersonOutlined></Link></MenuItem>
                            <MenuItem className='shopping-cart'><Badge badgeContent={products.length} classes={{ badge: classes.badge}} max={10}><Link to={`/users/${id}/cart`}><ShoppingCartOutlined></ShoppingCartOutlined></Link></Badge></MenuItem>
                            <Link onClick={handleLogout} to='/login'><MenuItem>Log Out</MenuItem></Link>
                        </>) : 
                        <Navigate to='/admin/dashboard' />) : <Link to='/login'><MenuItem>Log In</MenuItem></Link>
                    }
                    <MenuItem className='search'>
                        <Search className={classes.searchStyle}/>
                        <SearchField placeholder='Search for a book...'></SearchField>
                    </MenuItem>
                </Menu>
            </RightSideNav>
        </NavContainer>
    )
}

export default Navbar

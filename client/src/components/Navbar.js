import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { PersonOutlined, Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge, makeStyles } from "@material-ui/core";
import { NavContainer, LeftSideNav, RightSideNav, LogoWrapper, Logo, Menu, MenuItem, SearchField, Dropdown, DropdownItem } from './Navbar.styled';
import { axios_ } from '../axios/base_url';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllProducts, selectAllProducts } from '../store/cartSlice';

const useStyles = makeStyles(theme => ({
    searchStyle: {
        position: 'absolute',
        marginLeft: '7px',
        zIndex: '4',
        transform: 'translateY(30%)',
        color: '#A6A6A6',
        cursor: 'auto'
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
    const [delay, setDelay] = useState(null);
    const [searchProducts, setSearchProducts] = useState(null);
    let products = useSelector(selectAllProducts);
    const dispatch = useDispatch();
    const classes = useStyles();
    const role = sessionStorage.getItem('role');
    const id = sessionStorage.getItem('id');
    const searchRef = useRef();

    useEffect(() => {
        
    }, [delay]);
    
    const handleLogout = async () => {
        await dispatch(removeAllProducts());
        sessionStorage.clear();
        try {
            await axios_.get('/api/logout');
        } catch (err) {
            console.log(err);
        }
    }

    const handleSearch = (e) => {
        clearTimeout(delay);
        setDelay(setTimeout(async () => {
            const searchValue = e.target.value;
            console.log(searchValue);
            if (searchValue.trim() === "") {
                setSearchProducts(null);
            } else {
                try {
                    const response = await axios_.post('/products/search', {searchValue});
                    if (response.data) {
                        console.log(response.data);
                        setSearchProducts(response.data.searchResults);
                    }
                } catch (err) {
                    console.log(err);
                } 
            }
        }, 1000));
    }

    const handleClick = () => {
        if (searchRef.current) {
            searchRef.current.value = "";
        }
        setSearchProducts(null);
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
                        <SearchField onChange={handleSearch} ref={searchRef} placeholder='Search for a book...'></SearchField>
                        {searchProducts && (
                            <Dropdown>
                                {searchProducts.map(prod => {
                                    return prod.product_id !== null ? <Link to={`/products/${prod.product_id}`} onClick={handleClick}><DropdownItem key={prod.product_id}>{prod.title}</DropdownItem></Link> : <DropdownItem key={prod.product_id}>{prod.title}</DropdownItem>
                                })}
                            </Dropdown>
                        )}
                    </MenuItem>
                </Menu>
            </RightSideNav>
        </NavContainer>
    )
}

export default Navbar

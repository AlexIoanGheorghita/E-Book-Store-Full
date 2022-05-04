import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Product from '../pages/Product';
import Products from '../pages/Products';
import Register from '../pages/Register';

const PublicLayout = () => {
    const location = useLocation();

    return (
        <>
            {(location.pathname !== '/login' && location.pathname !== '/register') && <Navbar />}
            <Routes>
                <Route path='/' element={<Home />} /> 
                <Route path='/products/categories/:category' element={<Products />} />
                <Route path='/products/:productId' element={<Product />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
            {(location.pathname !== '/login' && location.pathname !== '/register') && <Footer />}
        </>
    )
}

export default PublicLayout
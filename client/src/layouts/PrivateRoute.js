import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// <Outlet/> is a placeholder for rendering the child routes

export const PrivateRoute = () => {
    const role = sessionStorage.getItem('role');

    return (role && role !== 'admin' ? <Outlet /> : <Navigate to='/login' />);
}

export default PrivateRoute;
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateAdminRoute = () => {
    const role = sessionStorage.getItem('role');

    return (role && role === 'admin' ? <Outlet /> : <Navigate to='/login' />);
}

export default PrivateAdminRoute
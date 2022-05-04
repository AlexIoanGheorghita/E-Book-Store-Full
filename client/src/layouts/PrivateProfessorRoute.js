import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateProfessorRoute = () => {
    const role = sessionStorage.getItem('role');

    return (role && role === 'professor' ? <Outlet /> : <Navigate to='/login' />);
}

export default PrivateProfessorRoute
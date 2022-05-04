import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Cart from '../pages/Cart';
import Dashboard from '../pages/Dashboard';
import Publish from '../pages/Publish';
import UserAccount from '../pages/UserAccount';
import PrivateRoute from './PrivateRoute';
import PrivateAdminRoute from './PrivateAdminRoute';
import PrivateProfessorRoute from './PrivateProfessorRoute';

const ProtectedLayout = () => {
  const location = useLocation();
  console.log(location);

  return (
    <>
      {location.pathname !== '/users/admin/dashboard' && <Navbar />}
      <Routes>
          <Route path='/:userId/cart' element={<PrivateRoute />}>
            <Route path='/:userId/cart' element={<Cart />} />
          </Route>
          <Route path='/publish' element={<PrivateProfessorRoute />}>
            <Route path='/publish' element={<Publish />} />
          </Route>
          <Route path='/:userId/account' element={<PrivateRoute />}>
            <Route path='/:userId/account' element={<UserAccount />} />
          </Route>
          <Route path='/admin/dashboard' element={<PrivateAdminRoute />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
          </Route>
      </Routes>
      {location.pathname !== '/users/admin/dashboard' && <Footer />}
    </>
  )
}

export default ProtectedLayout
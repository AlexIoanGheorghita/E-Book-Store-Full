import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { axios_ } from '../axios/base_url';
import DashProducts from '../components/admin_dashboard/DashProducts';
import Pending from '../components/admin_dashboard/Pending';
import { Wrapper, Container, DashboardMenu } from './Dashboard.styled';

const Dashboard = () => {
    const [toggle, setToggle] = useState({
        products: 'flex',
        awaiting_review: 'none'
    });

    const handleToggle = (e) => {
        const name = e.target.getAttribute('value'); // we can use e.target.value only for INPUT elements

        switch(name) {
            case 'products':
                setToggle({products: 'flex', awaiting_review: 'none'});
                break;
            case 'awaiting_review':
                setToggle({products: 'none', awaiting_review: 'flex'});
                break;
            default:
                setToggle({products: 'flex', awaiting_review: 'none'});
        }
    };

    const handleLogout = async  () => {
        sessionStorage.clear();
        try {
            await axios_.get('/api/logout');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Wrapper>
            <Container>
                <DashboardMenu>
                    <ul>
                        <li className='title'><span>Dashboard</span></li>
                        <li onClick={handleToggle} value='products'>Products</li>
                        <li onClick={handleToggle} value='awaiting_review'>Awaiting Review</li>
                        <Link onClick={handleLogout} to='/login'><li>Log out</li></Link>
                    </ul>
                </DashboardMenu>
                <DashProducts visible={toggle.products}/>
                <Pending visible={toggle.awaiting_review}/>
            </Container>
        </Wrapper>
    )
};

export default Dashboard;

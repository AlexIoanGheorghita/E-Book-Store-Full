import React, { useEffect, useState } from 'react';
import { Wrapper, DetailsMenu, ProfileImage, Section } from './UserAccount.styled';
import GeneralDetails from '../components/user_account/GeneralDetails';
import Books from '../components/user_account/Books';
import { axios_ } from '../axios/base_url';
import DeleteModal from '../components/user_account/DeleteModal';
import { useDispatch } from 'react-redux';
import { removeAllProducts } from '../store/cartSlice';

const UserAccount = () => {
    const [showWarning, setShowWarning] = useState(false);
    const [details, setDetails] = useState(null);
    const [errors, setErrors] = useState({
        lNameErr: '',
        fNameErr: '',
        emailErr: ''
    });
    const [toggle, setToggle] = useState({
        general: 'block',
        purchases: 'none',
        books: 'none'
    });
    const dispatch = useDispatch();

    useEffect(() => {
        loadDetails();
    }, [])

    const loadDetails = async () => {
        try {
            const response = await axios_.get(`/account/details/${sessionStorage.getItem('id')}`);
            console.log(response.data);
            if (response) {
                setDetails(response.data.userDetails);
            }
        } catch (err) {
            console.log(err);
        }
    } 

    const handleToggle = (e) => {
        const name = e.target.getAttribute('value'); // we can use e.target.value only for INPUT elements

        switch(name) {
            case 'general':
                setToggle({general: 'block', purchases: 'none', books: 'none'});
                break;
            case 'purchases':
                setToggle({general: 'none', purchases: 'block', books: 'none'});
                break;
            case 'books':
                setToggle({general: 'none', purchases: 'none', books: 'block'});
                break;
            default:
                setToggle({general: 'block', purchases: 'none', books: 'none'});
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Name: ${name}, Value: ${value}`);
        const errorName = e.target.getAttribute('data-error');

        if (!value) {
            setErrors({ ...errors, [errorName]: `This field is requierd` });
        } else {
            setErrors({ ...errors, [errorName]: '' });
        }

        setDetails({ 
            ...details, 
            general: {...details.general, [name]: value}
        });
        
        console.log(details);
    }

    const handleShowWarning = () => {
        setShowWarning(true);
    };

    const handleHideWarning = () => {
        setShowWarning(false);
    };

    const handleDelete = async  () => {
        try {
            const response = await axios_.get(`/account/${sessionStorage.getItem('id')}/delete`);
            if (response) {
                await dispatch(removeAllProducts());
                sessionStorage.clear();
                try {
                    await axios_.get('/api/logout');
                } catch (err) {
                    console.log(err);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Wrapper>
            {details &&
                <>
                    <DetailsMenu>
                        <ProfileImage></ProfileImage>
                        <p>{details.general.first_name}</p>
                        <p>{details.general.type_name}</p>
                        <hr></hr>
                        <ul>
                            <li onClick={handleToggle} value='general'>General</li>
                            <li onClick={handleToggle} value='purchases'>My Purchases</li>
                            <li onClick={handleToggle} value='books'>My Books</li>
                            <li onClick={handleShowWarning} value='delete'>Delete Account</li>
                        </ul>
                    </DetailsMenu>
                    <Section>
                        <GeneralDetails visible={toggle.general} details={details.general} handleChange={handleChange} errors={errors} setErrors={setErrors}/>
                        <Books title='My Purchases' visible={toggle.purchases} details={details.booksOwned}/>
                        <Books title='My Books' visible={toggle.books} details={details.booksWritten}/>
                    </Section>
                    <DeleteModal show={showWarning} closeModal={handleHideWarning} handleDelete={handleDelete}/>
                </>
            }
        </Wrapper>
    )
};

export default UserAccount;

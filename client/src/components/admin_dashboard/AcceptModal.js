import { makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModalContainer } from '../publish/Modal.styled';
import { ViewWindow, Button } from './AcceptModal.styled';
import { Category, Dropdown, Option } from './Pending.styled';
import { ButtonGroup } from './WarningModal.styled';
import { addAwaitingItemToExisting } from '../../store/productsAdminSlice';
import { axios_ } from '../../axios/base_url';

const useStyles = makeStyles({
    close: {
        width: '30px',
        height: '30px'
    }
});

const categoryOptions = ['--Choose an option--', 'Fiction', 'Non-Fiction', 'Reference'];

const emptySubcategory = ['--Choose an option--'];

const fictionSubcategory = ['--Choose an option--', 'Adventure', 'Thriller', 'Mystery', 'Romance', 'Classics', 'Mythology'];

const nonFictionSubcategory = ['--Choose an option--', 'Self-Development', 'Lifestyle', 'Health', 'Biography'];

const referenceSubcategory = ['--Choose an option--', 'Computer Science', 'Business', 'Law', 'Tourism', 'Kinesiotherapy', 'European Studies', 'Finance'];

const AcceptModal = ({ id, show, closeModal }) => {
    const classes = useStyles();
    const categoryRef = useRef(null);
    const currentCategoryRef = useRef(null);
    const buttonRef = useRef(null);
    const dispatch = useDispatch();
    const [category, setCategory] = useState(emptySubcategory);
    const [currentCategory, setCurrentCategory] = useState('--Choose an option--');

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.setAttribute('disabled', '');
        }
    }, []);

    /* Subcategory filter will change dynamically based on what category we choose */ 
    const handleCategory = () => {
        if (categoryRef.current) {
            const item = categoryRef.current;
            const cat = item.children[item.options.selectedIndex].getAttribute('value');
            switch(cat) {
                case '':
                    setCategory(emptySubcategory);
                    break;
                case 'Fiction':
                    setCategory(fictionSubcategory);
                    break;
                case 'Non-Fiction':
                    setCategory(nonFictionSubcategory);
                    break;
                case 'Reference':
                    setCategory(referenceSubcategory);
                    break;
                default:
                    setCategory(emptySubcategory);
            }
        }
    };

    const handleSubcategory = (e) => {
        if (e.target.value === '') {
            if (buttonRef.current) {
                buttonRef.current.setAttribute('disabled', '');
            }
            setCurrentCategory('--Choose an option--');
        } else {
            if (buttonRef.current) {
                buttonRef.current.removeAttribute('disabled');
            }
            setCurrentCategory(e.target.value);
        }
    }

    const changeStatus = async (id) => {
        try {
            const response = await axios_.put(`admin/products/${id}`, {category: categoryRef.current.children[categoryRef.current.options.selectedIndex].getAttribute('value'), subcategory: currentCategory});
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const acceptProduct = () => {
        changeStatus().then(() => {
            dispatch(addAwaitingItemToExisting(id));
            closeModal();
        }).catch((err) => console.log(err));
    }

    return (
        <ModalContainer visible={show}>
            <span className='close'><Close onClick={closeModal} className={classes.close}/></span>
            <ViewWindow>
                <p>Add product to a category and subcategory:</p>
                    <Category>
                        <p>Category:</p> 
                        <Dropdown ref={categoryRef} onChange={handleCategory}>                        
                            {categoryOptions.map(elem => {
                                return (categoryOptions.indexOf(elem) !== 0 ? 
                                    <Option value={elem} key={categoryOptions.indexOf(elem)}>{elem}</Option> : 
                                    <Option value="" key={categoryOptions.indexOf(elem)}>{elem}</Option>)
                            })}
                        </Dropdown>
                    </Category>
                    <Category>
                        <p>Subcategory:</p>
                        <Dropdown ref={currentCategoryRef} onChange={handleSubcategory}>
                            {category.map(elem => {
                                return (category.indexOf(elem) !== 0 ? 
                                    <Option value={elem} key={category.indexOf(elem)}>{elem}</Option> : 
                                    <Option value="" key={category.indexOf(elem)}>{elem}</Option>)
                            })}
                        </Dropdown>
                    </Category>
                <ButtonGroup>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button ref={buttonRef} onClick={acceptProduct} className='acceptButton'>Accept</Button>
                </ButtonGroup>
            </ViewWindow>
        </ModalContainer>
    )
}

export default AcceptModal
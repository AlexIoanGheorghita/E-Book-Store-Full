import { makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ViewWindow, ModalContainer } from '../publish/Modal.styled';
import { Category, Dropdown, Option } from './Pending.styled';
import { Button, ButtonGroup } from './WarningModal.styled';
import { addAwaitingItemToExisting } from '../../store/productsAdminSlice';
import { axios_ } from '../../axios/base_url';

const useStyles = makeStyles({
    close: {
        width: '30px',
        height: '30px'
    }
});

const categoryOptions = ['Fiction', 'Non-Fiction', 'Reference'];

const fictionSubcategory = ['Adventure', 'Thriller', 'Mystery', 'Romance', 'Classics', 'Mythology'];

const nonFictionSubcategory = ['Self-Development', 'Lifestyle', 'Health', 'Bibliography'];

const referenceSubcategory = ['Computer Science', 'Management-Marketing', 'Tourism', 'Law', 'European Studies', 'Kinesiotherapy'];

const AcceptModal = ({ id, show, closeModal }) => {
    const classes = useStyles();
    const categoryRef = useRef(null);
    const dispatch = useDispatch();
    const [category, setCategory] = useState(fictionSubcategory);

    /* Subcategory filter will change dynamically based on what category we choose */ 
    const handleCategory = () => {
        if (categoryRef.current) {
            const item = categoryRef.current;
            const cat = item.children[item.options.selectedIndex].getAttribute('value');
            switch(cat) {
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
                    setCategory(fictionSubcategory);
            }
        }
    };

    const changeStatus = async (id) => {
        try {
            const response = await axios_.put(`admin/products/${id}`);
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
                            return <Option value={elem} key={categoryOptions.indexOf(elem)}>{elem}</Option>
                        })}
                    </Dropdown>
                </Category>
                <Category>
                    <p>Subcategory:</p>
                    <Dropdown>
                        {category.map(elem => {
                            return <Option value={elem} key={category.indexOf(elem)}>{elem}</Option>
                        })}
                    </Dropdown>
                </Category>
                <ButtonGroup>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button onClick={acceptProduct} className='acceptButton'>Accept</Button>
                </ButtonGroup>
            </ViewWindow>
        </ModalContainer>
    )
}

export default AcceptModal
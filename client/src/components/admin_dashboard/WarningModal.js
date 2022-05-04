import { makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeAwaitingProduct, removeExistingProduct } from '../../store/productsAdminSlice';
import { ViewWindow, ModalContainer, ButtonGroup, Button } from './WarningModal.styled';

const useStyles = makeStyles({
    close: {
        width: '30px',
        height: '30px'
    }
});

const WarningModal = ({ type, id, show, closeModal }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const deleteProduct = async () => {
        if (type === 'awaiting') {
            dispatch(removeAwaitingProduct(id));
        } else if (type === 'existing') {
            dispatch(removeExistingProduct(id));
        }
        closeModal();
    }

    return (
        <ModalContainer visible={show}>
            <span className='close'><Close onClick={closeModal} className={classes.close}/></span>
            <ViewWindow>
                <p><span className='warning'>WARNING!</span> This action is irreversible. Are you sure you want to continue?</p>
                <ButtonGroup>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button onClick={deleteProduct} className='warningButton'>Delete</Button>
                </ButtonGroup>
            </ViewWindow>
        </ModalContainer>
    )
};

export default WarningModal;

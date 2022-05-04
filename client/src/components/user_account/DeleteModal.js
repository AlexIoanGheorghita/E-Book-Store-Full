import { makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import { ViewWindow, ModalContainer, ButtonGroup, Button } from '../admin_dashboard/WarningModal.styled';

const useStyles = makeStyles({
    close: {
        width: '30px',
        height: '30px'
    }
});

const DeleteModal = ({ show, closeModal, handleDelete }) => {
    const classes = useStyles();

    return (
        <ModalContainer visible={show}>
            <span className='close'><Close onClick={closeModal} className={classes.close}/></span>
            <ViewWindow>
                <p><span className='warning'>WARNING!</span> This action is irreversible. Are you sure you want to continue?</p>
                <ButtonGroup>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button onClick={handleDelete} className='warningButton'>Delete</Button>
                </ButtonGroup>
            </ViewWindow>
        </ModalContainer>
    )
};

export default DeleteModal;

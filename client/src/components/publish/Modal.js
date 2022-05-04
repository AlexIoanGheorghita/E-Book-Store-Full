import React from 'react';
import { ModalContainer, ViewWindow } from './Modal.styled';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import ProductPreview from './ProductPreview';
import UploadPreview from '../admin_dashboard/UploadPreview';

const useStyles = makeStyles({
    close: {
        width: '30px',
        height: '30px'
    }
});

const Modal = ({ closeModal, show, docDetails, maximize = false }) => {
    const classes = useStyles();

    return (
        <ModalContainer visible={show} maximize={maximize}>
            <span className='close'><Close onClick={closeModal} className={classes.close}/></span>
            <ViewWindow>
                {docDetails ? (maximize ? <UploadPreview prodDetails={docDetails} numOfReviews={5} rating={5}/> : <ProductPreview prodDetails={docDetails} numOfReviews={5} rating={5}/>) : <></>}
            </ViewWindow>
        </ModalContainer>
    )
};

export default Modal;

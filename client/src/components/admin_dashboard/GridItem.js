import { Delete } from '@material-ui/icons';
import React from 'react';
import { useState } from 'react';
import EditModal from './EditModal';
import { Card, Field } from './GridItem.styled';
import WarningModal from './WarningModal';

const GridItem = ({ item }) => {
    const [showModal, setShowModal] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const handleShow = () => {
        setShowModal(true);
    };

    const handleHide = () => {
        setShowModal(false);
    };

    const handleShowWarning = () => {
        setShowWarning(true);
    };

    const handleHideWarning = () => {
        setShowWarning(false);
    };

    return (
        <Card>
            <Field>ID: {item.product_id}</Field>
            <Field>Title: {item.title}</Field>
            <Field>Author: {item.authors}</Field>
            <Field>Price: {item.price}</Field>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Field><button onClick={handleShow}>Make changes</button></Field>
            <Field className='deleteButton'><button onClick={handleShowWarning}><Delete />Remove product</button></Field>
            <EditModal show={showModal} closeModal={handleHide} details={item}/>
            <WarningModal type={'existing'} show={showWarning} closeModal={handleHideWarning}/>
        </Card>
    )
};

export default GridItem;

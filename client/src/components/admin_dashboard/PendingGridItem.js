import { Check, Delete } from '@material-ui/icons';
import React, { useState } from 'react';
import AcceptModal from './AcceptModal';
import { Card, Field } from './GridItem.styled';
import ViewModal from './ViewModal';
import WarningModal from './WarningModal';

const PendingGridItem = ({ item }) => {
    const [showModal, setShowModal] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showAccept, setShowAccept] = useState(false);

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

    const handleShowAccept = () => {
        setShowAccept(true);
    };

    const handleHideAccept = () => {
        setShowAccept(false);
    };

    return (
        <Card>
            <Field>ID: {item.product_id}</Field>
            <Field>Added: {item.date_published}</Field>
            <Field>Author: {item.author_name}</Field>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Field><button onClick={handleShow}>See details</button></Field>
            <Field className='acceptButton'><button onClick={handleShowAccept}><Check />Accept</button></Field>
            <Field className='deleteButton'><button onClick={handleShowWarning}><Delete />Reject</button></Field>
            <ViewModal show={showModal} closeModal={handleHide} details={item}/>
            <AcceptModal id={item.product_id} show={showAccept} closeModal={handleHideAccept}/>
            <WarningModal type={'awaiting'} id={item.product_id} show={showWarning} closeModal={handleHideWarning}/>
        </Card>
    )
};

export default PendingGridItem;

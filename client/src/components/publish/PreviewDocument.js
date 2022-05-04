import { makeStyles } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import React, { useState } from 'react';
import { Container, StepNumber, Title, Description } from '../../pages/Publish.styled';
import { DetailsContainer } from './DocumentDetails.styled';
import { Button } from './PreviewDocument.styled';
import Modal from './Modal';

const useStyles = makeStyles({
    preview: {
        marginRight: '4px'
    }
});

const PreviewDocument = React.forwardRef(({ setClicks, details }, ref) => {
    const classes = useStyles();

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => {
        if (ref.current) {
            if (!ref.current.hasAttribute('disabled')) {
                setClicks(1);
                setShowModal(true);
            } else {
                setClicks(0);
            }
        }
    };

    const handleHide = () => {
        setShowModal(false);
    };

    return (
        <Container>
            <StepNumber>
                <span>3</span>
            </StepNumber>
            <DetailsContainer>
                <Title>Preview your work</Title>
                <Description>
                    You can take a look at how your document will look like once it will be listed on the store. 
                    This way, you can adjust details as you please.
                </Description>
                <Button ref={ref} onClick={handleShow}><Visibility className={classes.preview}/>Preview</Button>
                <Modal show={showModal} closeModal={handleHide} docDetails={details}/>
            </DetailsContainer>
        </Container>
    )
});

export default PreviewDocument;

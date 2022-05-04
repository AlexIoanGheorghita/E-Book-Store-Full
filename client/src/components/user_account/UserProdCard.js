import React, { useState } from 'react';
import { axios_ } from '../../axios/base_url';
import PDFViewer from './PDFViewer';
import { Wrapper, Image } from './UserProdCard.styled';

const UserProdCard = ({ element }) => {
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState(null);

    const handleHide = () => {
        setShowModal(false);
    };

    const handleClick = async () => {
        try {
            const response = await axios_.get(`/account/details/${sessionStorage.getItem('id')}/${element.product_id}`);
            if (response) {
                setShowModal(true);
                setUrl(response.data.document_url);
                //window.location.href = response.data.document_url;
            }
        } catch (err) {
            console.log('File not found');
        }
    }

    return (
        <>
            <Wrapper onClick={handleClick}>
                <Image src={element.thumbnail_url}/>
            </Wrapper>
            {url && <PDFViewer pdf_url={url} show={showModal} closeModal={handleHide}/>}
        </>
    )
};

export default UserProdCard;

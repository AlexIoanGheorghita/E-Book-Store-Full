import { ArrowLeftOutlined, ArrowRightOutlined, Close } from '@material-ui/icons'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';
import { ModalContainer } from './PDFViewer.styled';
import { Document, Page, pdfjs } from 'react-pdf';

const useStyles = makeStyles({
    close: {
        width: '30px',
        height: '30px'
    }
});

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ pdf_url, show, closeModal }) => {
    const [pages, setPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const classes = useStyles();

    const onDocumentLoadSuccess = ({ numPages }) => {
        setPages(numPages);
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage < pages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <ModalContainer visible={show}>
            <span className='close'><Close onClick={closeModal} className={classes.close}/></span>
            <div className='buttonWrapper'><button onClick={prevPage}><ArrowLeftOutlined/>Previous Page</button>
            <button onClick={nextPage}>Next Page<ArrowRightOutlined/></button></div>
            <Document onLoadSuccess={onDocumentLoadSuccess} onContextMenu={(e) => e.preventDefault()} file={pdf_url} id="pdf-container">
                <Page pageNumber={currentPage}/>
            </Document>
        </ModalContainer>
    )
}

export default PDFViewer
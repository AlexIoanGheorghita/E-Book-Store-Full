import { KeyboardArrowLeftRounded, KeyboardArrowRightRounded } from '@material-ui/icons';
import React from 'react';
import { Wrapper, LeftArrow, RightArrow, PageNumber } from './Pagination.styled';

const Pagination = ({ pages, getPageNum }) => {
    return (
        <Wrapper>
            <LeftArrow><KeyboardArrowLeftRounded /></LeftArrow>
            {/* returned props is an object, so we iterate in a different way */}
            {Object.keys(pages).map(page => {
                return <PageNumber onClick={getPageNum} data-key={page} key={page.split('page')[1]}>{page.split('page')[1]}</PageNumber>
            })}
            <RightArrow><KeyboardArrowRightRounded /></RightArrow>
        </Wrapper>
    )
}

export default Pagination

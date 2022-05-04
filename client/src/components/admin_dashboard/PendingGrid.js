import React from 'react';
import { Wrapper } from './Grid.styled';
import PendingGridItem from './PendingGridItem';

const PendingGrid = ({ items }) => {
    return (
        <Wrapper>
            {items && items.map(item => {
                return <PendingGridItem item={item}/>
            })}
        </Wrapper>
    )
};

export default PendingGrid;

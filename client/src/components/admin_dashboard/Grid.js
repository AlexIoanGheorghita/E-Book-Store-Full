import React from 'react';
import GridItem from './GridItem';
import { Wrapper } from './Grid.styled';

const Grid = ({ items }) => {
    return (
        <Wrapper>
            {items && items.map(item => {
                return <GridItem item={item}/>
            })}
        </Wrapper>
    )
};

export default Grid;

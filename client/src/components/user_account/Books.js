import React from 'react';
import { Wrapper, Grid } from './Books.styled';
import { WrappingBox, Title } from './GeneralDetails.styled';
import UserProdCard from './UserProdCard';

const Books = ({ title, visible, details }) => {

    return (
        <Wrapper visible={visible} items={details.length}>
            <WrappingBox>
                <Title>{title}</Title>
                {details.length > 0 ? <Grid>
                    {details.map(elem => {
                        return <UserProdCard element={elem}/>
                    })}
                </Grid> : <p>No books in your library</p>}
            </WrappingBox>
        </Wrapper>
    )
};

export default Books;

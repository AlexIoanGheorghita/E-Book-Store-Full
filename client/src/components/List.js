import { makeStyles } from '@material-ui/core';
import { KeyboardArrowDownRounded } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuTitle, SubMenu, Item } from '../pages/Products.styled';

const useStyles = makeStyles({
    arrows: (props) => ({
        marginLeft: '5px',
        transform: props.transformation,
        transition: 'transform 0.5s ease'
    })
});

const List = ({ title, items }) => {
    const navigate = useNavigate();
    const heightRef = useRef(null);

    const [arrow, setArrow] = useState({
        transformation: 'rotate(-90deg)',
        height: '0px'
    });

    const classes = useStyles(arrow);

    const handleArrowAnimation = () => {
        arrow.transformation === 'rotate(-90deg)' ? 
            setArrow({transformation: 'rotate(0deg)', height: (heightRef.current.children.length * 27) + 'px'}) : 
            setArrow({transformation: 'rotate(-90deg)', height: '0px'});
    }

    const changeCategory = (e) => {
        navigate(`/products/categories/${e.target.getAttribute('data-value')}`);
    }

    return (
        <>
            <MenuTitle onClick={handleArrowAnimation}>{title} <KeyboardArrowDownRounded className={classes.arrows}/></MenuTitle>
            <SubMenu style={{ height: arrow.height }} ref={heightRef}>
                {items.map(elem => {
                    return <Item onClick={changeCategory} key={items.indexOf(elem)} data-value={elem}>{elem}</Item>
                })}
            </SubMenu>
        </>
    )
}

export default List

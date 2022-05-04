import { makeStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAwaitingProducts, selectFreeBooks, selectSortedAscByAuthor, selectSortedAscByPrice, selectSortedAscByTitle, selectSortedDescByAuthor, selectSortedDescByPrice, selectSortedDescByTitle } from '../../store/productsAdminSlice';
import {
    WrapperDash,
    Wrapper,
    FilterOptions,
    Results,
    FilterContainer,
    Category,
    Dropdown,
    Option,
    SearchWrapper,
    SearchField
} from './Pending.styled';
import PendingGrid from './PendingGrid';

const sortOptions = [
    '--Chose an option--',
    'Price (Asc)',
    'Price (Desc)',
    'Title (A-Z)',
    'Title (Z-A)',
    'Author (A-Z)',
    'Author (Z-A)'
];

const filterOptions = [
    '--Chose an option--',
    'Price (Free)'
];

const useStyles = makeStyles(theme => ({
    searchStyle: {
        position: 'absolute',
        marginLeft: '7px',
        zIndex: '2',
        transform: 'translateY(30%)',
        color: '#A6A6A6'
    }
}));

const Pending = (props) => {
    const classes = useStyles();
    const [products, setProducts] = useState(null);
    const dispatch = useDispatch();

    const items = useSelector(state => state.admin.awaitingProducts);       // array of all products
    const freeBooks = useSelector(selectFreeBooks);                         // only free products
    const titleAscSort = useSelector(selectSortedAscByTitle);               // products sorted ascendingly by title
    const titleDescSort = useSelector(selectSortedDescByTitle);             // products sorted descendingly by title
    const priceAscSort = useSelector(selectSortedAscByPrice);               // products sorted ascendingly by price
    const priceDescSort = useSelector(selectSortedDescByPrice);             // products sorted descendingly by price
    const authorAscSort = useSelector(selectSortedAscByAuthor);             // products sorted ascendingly by author name
    const authorDescSort = useSelector(selectSortedDescByAuthor);           // products sorted descendingly by author name

    useLayoutEffect(() => {
        dispatch(loadAwaitingProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setProducts(items);
    }, [items]);

    const handleFiltering = (e) => {
        const selectedValue = e.target.value;
        console.log(selectedValue);

        switch (selectedValue) {
            case '':
                setProducts(items);
                break;
            case 'Price (Free)':
                setProducts(freeBooks);
                break;
            default:
                console.log('Default');
        }
    };

    const handleSorting = (e) => {
        const selectedValue = e.target.value;
        console.log(selectedValue);

        switch (selectedValue) {
            case '':
                setProducts(items);
                break;
            case 'Title (A-Z)':
                setProducts(titleAscSort);
                break;
            case 'Title (Z-A)':
                setProducts(titleDescSort);
                break;
            case 'Price (Asc)':
                setProducts(priceAscSort);
                break;
            case 'Price (Desc)':
                setProducts(priceDescSort);
                break;
            case 'Author (Asc)':
                setProducts(authorAscSort);
                break;
            case 'Author (Desc)':
                setProducts(authorDescSort);
                break;
            default:
                console.log('Default');
        }
    };

    const handleSearchById = (e) => {
        let id = e.target.value;

        const itemFound = items.find(elem => elem.product_id === Number(id));
        if (itemFound !== undefined) {
            setProducts([itemFound]);
        } else {
            dispatch(loadAwaitingProducts());
        }
    }

    return (
        <WrapperDash visible={props.visible}>
            <Wrapper>
                <Results>Results: </Results>
                <FilterOptions>
                    <FilterContainer>
                        <Category>
                            <p>Sort by:</p>
                            <Dropdown name="sort-options" onChange={handleSorting}>
                                {sortOptions.map(elem => {
                                    return (sortOptions.indexOf(elem) !== 0 ? 
                                        <Option value={elem} key={sortOptions.indexOf(elem)}>{elem}</Option> : 
                                        <Option value="" key={sortOptions.indexOf(elem)}>{elem}</Option>)
                                })}
                            </Dropdown>
                        </Category>
                        <Category>
                            <p>Filter by:</p>
                            <Dropdown onChange={handleFiltering}>
                                {filterOptions.map(elem => {
                                    return (filterOptions.indexOf(elem) !== 0 ? 
                                        <Option value={elem} key={filterOptions.indexOf(elem)}>{elem}</Option> : 
                                        <Option value="" key={filterOptions.indexOf(elem)}>{elem}</Option>)
                                })}
                            </Dropdown>
                        </Category>
                    </FilterContainer>
                    <SearchWrapper className='search'>
                        <Search className={classes.searchStyle}/>
                        <SearchField 
                            placeholder='Search for an item id...' 
                            onFocus={() => dispatch(loadAwaitingProducts())}
                            onChange={handleSearchById}
                        />
                    </SearchWrapper>
                </FilterOptions>
                <hr></hr>
                <PendingGrid items={products}/>
            </Wrapper>
        </WrapperDash>
    )
};

export default Pending;

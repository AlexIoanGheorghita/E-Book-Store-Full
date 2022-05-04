import { makeStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadExistingProducts, selectExistingSortedAscByAuthor, selectExistingSortedAscByPrice, selectExistingSortedAscByTitle, selectExistingSortedDescByAuthor, selectExistingSortedDescByPrice, selectExistingSortedDescByTitle, selectFreeExistingBooks, selectnewExistingReleases } from '../../store/productsAdminSlice';
import {
    WrapperDash,
    ButtonGroup,
    TopButton,
    Wrapper,
    FilterOptions,
    Results,
    FilterContainer,
    Category,
    Dropdown,
    Option,
    SearchWrapper,
    SearchField
} from './DashProducts.styled';
import Grid from './Grid';
import UploadProduct from './UploadProduct';

const categoryOptions = ['--Choose an option--', 'Fiction', 'Non-Fiction', 'Reference'];

const emptySubcategory = ['--Choose an option--'];

const fictionSubcategory = ['--Choose an option--', 'Adventure', 'Thriller', 'Mystery', 'Romance', 'Classics', 'Mythology'];

const nonFictionSubcategory = ['--Choose an option--', 'Self-Development', 'Lifestyle', 'Health', 'Biography'];

const referenceSubcategory = ['--Choose an option--', 'Computer Science', 'Business', 'Law', 'Tourism', 'Kinesiotherapy', 'European Studies', 'Finance'];

const sortOptions = [
    '--Choose an option--',
    'Price (Asc)',
    'Price (Desc)',
    'Title (A-Z)',
    'Title (Z-A)',
    'Author (A-Z)',
    'Author (Z-A)'
];

const filterOptions = [
    '--Choose an option--',
    'Price (Free)',
    'New Releases'
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

const DashProducts = (props) => {
    const classes = useStyles();
    const categoryRef = useRef(null);
    const dispatch = useDispatch();
    const [category, setCategory] = useState(emptySubcategory);
    const [currentCategory, setCurrentCategory] = useState('--Choose an option--');
    const [toggle, setToggle] = useState({
        edit: 'flex',
        upload: 'none'
    });
    const [products, setProducts] = useState(null);

    const items = useSelector((state) => state.admin.existingProducts);     // array of all products
    const freeBooks = useSelector(selectFreeExistingBooks);                 // only free products
    const newReleases = useSelector(selectnewExistingReleases);             // only new releases (present - 2 years up to present year)
    const titleAscSort = useSelector(selectExistingSortedAscByTitle);       // products sorted ascendingly by title
    const titleDescSort = useSelector(selectExistingSortedDescByTitle);     // products sorted descendingly by title
    const priceAscSort = useSelector(selectExistingSortedAscByPrice);       // products sorted ascendingly by price
    const priceDescSort = useSelector(selectExistingSortedDescByPrice);     // products sorted descendingly by price
    const authorAscSort = useSelector(selectExistingSortedAscByAuthor);     // products sorted ascendingly by author name
    const authorDescSort = useSelector(selectExistingSortedDescByAuthor);   // products sorted descendingly by author name

    useLayoutEffect(() => {
        dispatch(loadExistingProducts('all'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setProducts(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    useEffect(() => {
        console.log(category);
        console.log(currentCategory);
        if (currentCategory !== '--Choose an option--') {
            dispatch(loadExistingProducts(currentCategory));
        } else {
            dispatch(loadExistingProducts('all'));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCategory]);
    
    /* Subcategory filter will change dynamically based on what category we choose */ 
    const handleCategory = () => {
        if (categoryRef.current) {
            const item = categoryRef.current;
            const cat = item.children[item.options.selectedIndex].getAttribute('value');
            switch(cat) {
                case '':
                    setCategory(emptySubcategory);
                    setCurrentCategory('--Choose an option--');
                    setProducts(items);
                    break;
                case 'Fiction':
                    setCategory(fictionSubcategory);
                    break;
                case 'Non-Fiction':
                    setCategory(nonFictionSubcategory);
                    break;
                case 'Reference':
                    setCategory(referenceSubcategory);
                    break;
                default:
                    setCategory(emptySubcategory);
            }
        }
    };

    const handleSubcategory = (e) => {
        if (e.target.value === '') {
            setProducts(items);
        } else {
            setCurrentCategory(e.target.value);
        }
    }

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
            case 'New Releases':
                setProducts(newReleases); 
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
            case 'Author (A-Z)':
                setProducts(authorAscSort);
                break;
            case 'Author (Z-A)':
                setProducts(authorDescSort);
                break;
            default:
                console.log('Default');
        }
    };

    const handleToggle = (e) => {
        const name = e.target.getAttribute('value'); // we can use e.target.value only for INPUT elements

        switch(name) {
            case 'edit':
                setToggle({edit: 'flex', upload: 'none'});
                break;
            case 'upload':
                setToggle({edit: 'none', upload: 'flex'});
                break;
            default:
                setToggle({edit: 'flex', upload: 'none'});
        }
    };

    const handleSearchById = (e) => {
        //dispatch(loadExistingProducts('all'));
        let id = e.target.value;

        const itemFound = items.find(elem => elem.product_id === Number(id));
        if (itemFound !== undefined) {
            setProducts([itemFound]);
        } else {
            dispatch(loadExistingProducts('all'));
        }
    }

    return (
        <WrapperDash visible={props.visible}>
            <ButtonGroup>
                <TopButton onClick={handleToggle} value='edit'>Edit Products</TopButton>
                <TopButton onClick={handleToggle} value='upload'>Upload Product</TopButton>
            </ButtonGroup>
            <Wrapper visibleSub={toggle.edit}>
                <Results>Results: </Results>
                <FilterOptions>
                    <FilterContainer>
                        <Category>
                            <p>Category:</p> 
                            <Dropdown ref={categoryRef} onChange={handleCategory}>                        
                                {categoryOptions.map(elem => {
                                    return (categoryOptions.indexOf(elem) !== 0 ? 
                                        <Option value={elem} key={categoryOptions.indexOf(elem)}>{elem}</Option> : 
                                        <Option value="" key={categoryOptions.indexOf(elem)}>{elem}</Option>)
                                })}
                            </Dropdown>
                        </Category>
                        <Category>
                            <p>Subcategory:</p>
                            <Dropdown onChange={handleSubcategory}>
                                {category.map(elem => {
                                    return (category.indexOf(elem) !== 0 ? 
                                        <Option value={elem} key={category.indexOf(elem)}>{elem}</Option> : 
                                        <Option value="" key={category.indexOf(elem)}>{elem}</Option>)
                                })}
                            </Dropdown>
                        </Category>
                        <Category>
                            <p>Sort by:</p>
                            <Dropdown onChange={handleSorting} name="sort-options">
                                {sortOptions.map(elem => {
                                    return (sortOptions.indexOf(elem) !== 0 ? 
                                        <Option value={elem} key={sortOptions.indexOf(elem)}>{elem}</Option> : 
                                        <Option value="" key={sortOptions.indexOf(elem)}>{elem}</Option>)
                                })}
                            </Dropdown>
                        </Category>
                        <Category>
                            <p>Filter by:</p>
                            <Dropdown onChange={handleFiltering} >
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
                            onFocus={() => dispatch(loadExistingProducts('all'))}
                            onChange={handleSearchById}
                        />
                    </SearchWrapper>
                </FilterOptions>
                <hr></hr>
                <Grid items={products}/>
            </Wrapper>
            <UploadProduct visibleSub={toggle.upload}/>
        </WrapperDash>
    )
};

export default DashProducts;

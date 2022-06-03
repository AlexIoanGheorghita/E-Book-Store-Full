import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ProductsContainer, Categories, Title, Menu, ProductGrid, Grid } from './Products.styled';
import List from '../components/List';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    loadProducts, 
    selectFreeBooks, 
    selectnewReleases,
    selectSortedAscByTitle,
    selectSortedDescByTitle,
    selectSortedAscByPrice,
    selectSortedDescByPrice
} from '../store/productsSlice';
import Card from '../components/Card';

const text = {
    list1: {
        title: 'Fiction',
        items: ['Adventure', 'Mystery', 'Romance', 'Classics', 'Mythology']
    },
    list2: {
        title: 'Non-Fiction',
        items: ['Self-Development', 'Lifestyle', 'Health', 'Biography']
    },
    list3: {
        title: 'Reference Books',
        items: ['Computer Science', 'Business', 'Law', 'Tourism', 'Kinesiotherapy', 'European Studies', 'Finance']
    }
};

const Products = () => {
    const [pageNum, setPageNum] = useState('page1');
    const [products, setProducts] = useState(null);
    const category = useParams().category;
    const dispatch = useDispatch();

    // SELECTORS
    const prodArray = useSelector((state) => state.products.productArray);  // all products                                                   
    const pages = useSelector((state) => state.products.pages);             // products per page     
    const freeBooks = useSelector(selectFreeBooks);                         // only free products
    const newReleases = useSelector(selectnewReleases);                     // only new releases (present - 2 years up to present year)
    const titleAscSort = useSelector(selectSortedAscByTitle);               // products sorted ascendingly by title
    const titleDescSort = useSelector(selectSortedDescByTitle);             // products sorted descendingly by title
    const priceAscSort = useSelector(selectSortedAscByPrice);               // products sorted ascendingly by price
    const priceDescSort = useSelector(selectSortedDescByPrice);             // products sorted descendingly by price

    useLayoutEffect(() => {
        dispatch(loadProducts(category));
        console.log(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    useEffect(() => {
        setProducts(pages);
    }, [pages]);

    console.log(products);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pageNum])

    const getPageNumber = (e) => {
        const num = e.target.getAttribute('data-key');
        setPageNum(num);
    };

    const handleFiltering = (e) => {
        const selectedValue = e.target.value;
        console.log(selectedValue);

        switch (selectedValue) {
            case '':
                setProducts(pages);
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
                setProducts(pages);
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
            default:
                console.log('Default');
        }
    };

    return (
        <ProductsContainer>
            <Categories>
                <Title>Categories</Title>
                <Menu>
                    {Object.keys(text).map(textTitle => {
                        if (sessionStorage.getItem('role') && sessionStorage.getItem('role') !== 'individual') {
                            return <List title={text[textTitle].title} items={text[textTitle].items} key={Object.keys(text).indexOf(textTitle)}></List>
                        } else {
                            if (textTitle !== 'list3') {
                                return <List title={text[textTitle].title} items={text[textTitle].items} key={Object.keys(text).indexOf(textTitle)}></List>
                            } else {
                                return null;
                            }
                        }
                    })}
                </Menu>
            </Categories>
            <ProductGrid>
                <Filters handleSort={handleSorting} handleFilter={handleFiltering} results={prodArray.length}></Filters>
                {products ? (<Grid>
                    {products[pageNum].map(product => {
                        return <Link to={`/products/${product.product_id}`} key={product.product_id}><Card maximize={true} title={product.title} image={product.thumbnail_url} author={product.author_name}/></Link>
                    })}
                </Grid>) : null}
                <Pagination pages={pages} getPageNum={getPageNumber}/>
            </ProductGrid>
        </ProductsContainer>
    )
}

export default Products

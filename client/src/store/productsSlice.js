import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios_ } from "../axios/base_url";

export const loadProducts = createAsyncThunk('products/loadProducts', async (category) => {
    const response = await axios_.get(`/products/categories/${category}`);
    return response.data;
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        productArray: [],
        pages: {'page1': []}
    },
    reducers: {},
    extraReducers: {
        [loadProducts.pending]: (state, action) => {},
        [loadProducts.fulfilled]: (state, action) => {
            state.pages = {'page1': []};
            state.productArray = action.payload;
            
            // This snippet allows us to perform pagination
            const numOfItems = action.payload.length;
            if (numOfItems <= 12) {
                state.pages['page1'] = action.payload;
            } else {
                let counter = 1;
                let pageNum = 'page1';
                for (let i = 0; i < numOfItems; i++) {
                    state.pages[pageNum].push(action.payload[i]);
                    
                    if ((i + 1) % 12 === 0) {
                        counter++;
                        pageNum = 'page' + counter;
                        state.pages[pageNum] = []; // we make the next object property value to be an array
                    }
                }
            }

            // console.log(`State: ${action.payload}`);
        },
        [loadProducts.rejected]: (state, action) => {
            console.log('An error occured');
        }
    }
});

// ------------------- UTILITY FUNCTIONS ------------------- //

// Utility function for arranging products into pages
const arrange = (arr) => {
    const pages = {'page1': []};
    
    // This snippet allows us to perform pagination
    const numOfItems = arr.length;
    if (numOfItems <= 12) {
        pages['page1'] = arr;
    } else {
        let counter = 1;
        let pageNum = 'page1';
        for (let i = 0; i < numOfItems; i++) {
            pages[pageNum].push(arr[i]);
            
            if ((i + 1) % 12 === 0) {
                counter++;
                pageNum = 'page' + counter;
                pages[pageNum] = []; // we make the next object property value to be an array
            }
        }
    }

    return pages;
}

// Utility function for extracting everything from an object into an array
const populateArr = (state) => {
    let arr = [];
    for (const key in state.products.pages) {
        arr = [...arr, ...state.products.pages[key]];
    }
    return arr;
}


// ------------------- SELECTORS ------------------- //
export const selectFreeBooks = (state) => {
    let arr = [];
    for (const key in state.products.pages) {
        arr = [...arr, ...state.products.pages[key].filter(elem => {
            return elem.price === '0.00';
        })];
    }

    const pages = arrange(arr);
    return pages;
}

export const selectnewReleases = (state) => {
    const year = new Date().getFullYear();
    let arr = [];
    for (const key in state.products.pages) {
        arr = [...arr, ...state.products.pages[key].filter(elem => {
            return (elem.date_published <= year && elem.date_published >= year - 2);
        })];
    }

    const pages = arrange(arr);
    return pages;
}

export const selectSortedAscByTitle = (state) => {
    let arr = populateArr(state);

    arr.sort(function (a, b) {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });

    const pages = arrange(arr);
    return pages;
}

export const selectSortedDescByTitle = (state) => {
    let arr = populateArr(state);

    arr.sort(function (a, b) {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA > titleB) {
            return -1;
        }
        if (titleA < titleB) {
            return 1;
        }
        return 0;
    });

    const pages = arrange(arr);
    return pages;
}

export const selectSortedAscByPrice = (state) => {
    let arr = populateArr(state);

    arr.sort(function (a, b) {
        return a.price - b.price;
    });

    const pages = arrange(arr);
    return pages;
}

export const selectSortedDescByPrice = (state) => {
    let arr = populateArr(state);

    arr.sort(function (a, b) {
        return b.price - a.price;
    });

    const pages = arrange(arr);
    return pages;
}

export default productsSlice.reducer;
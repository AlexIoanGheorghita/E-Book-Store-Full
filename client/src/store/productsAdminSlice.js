import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios_ } from "../axios/base_url";

export const loadAwaitingProducts = createAsyncThunk('admin/loadAwaitingProducts', async () => {
    const response = await axios_.get('/admin/products/awaiting');
    return response.data;
});

export const removeAwaitingProduct = createAsyncThunk('admin/removeAwaitingProduct', async (id) => {
    const response = await axios_.delete(`/admin/products/awaiting/${id}`);
    console.log(response.data);
    return id;
});

export const loadExistingProducts = createAsyncThunk('admin/loadExistingProducts', async (category) => {
    const response = await axios_.get(`/admin/products/existing/${category}`);
    return response.data;
});

export const removeExistingProduct = createAsyncThunk('admin/removeExistingProduct', async (id) => {
    const response = await axios_.delete(`/admin/products/existing/${id}`);
    console.log(response.data);
    return id;
});

const productsAdminSlice = createSlice({
    name: 'admin',
    initialState: {
        existingProducts: [],
        awaitingProducts: []
    },
    reducers: {
        addAwaitingItemToExisting: (state, action) => {
            state.awaitingProducts = state.awaitingProducts.filter(elem => {
                return elem.product_id !== action.payload;
            });
            state.existingProducts = [...state.existingProducts, action.payload];
        },
        addNewProduct: (state, action) => {
            if (!state.existingProducts.includes(action.payload)) {
                state.existingProducts = [...state.existingProducts, action.payload];
            }
        }
    },
    extraReducers: {
        [loadExistingProducts.pending]: (state, action) => {},
        [loadExistingProducts.fulfilled]: (state, action) => {
            state.existingProducts = action.payload;
        },
        [loadExistingProducts.rejected]: (state, action) => {
            console.log('An error occured loading the products');
        },
        [loadAwaitingProducts.pending]: (state, action) => {},
        [loadAwaitingProducts.fulfilled]: (state, action) => {
            state.awaitingProducts = action.payload;
        },
        [loadAwaitingProducts.rejected]: (state, action) => {
            console.log('An error occured');
        },
        [removeAwaitingProduct.pending]: (state, action) => {},
        [removeAwaitingProduct.fulfilled]: (state, action) => {
            return state.awaitingProducts.filter(elem => {
                return elem.product_id !== action.payload;
            });
        },
        [removeAwaitingProduct.rejected]: (state, action) => {
            console.log('Could not delete product');
        },
        [removeExistingProduct.pending]: (state, action) => {},
        [removeExistingProduct.fulfilled]: (state, action) => {
            return state.existingProducts.filter(elem => {
                return elem.product_id !== action.payload;
            });
        },
        [removeExistingProduct.rejected]: (state, action) => {
            console.log('Could not delete product');
        }
    }
});

// --- UTILITY FUNCTION (BUBBLE SORT) --- //

/////// -------------------------------------------------------- ///////
/////// WORK WITH COPIES OF THE ARRAY!!!!!! DO NOT MUTATE IT!!!! ///////
/////// -------------------------------------------------------- ///////
const bubbleSort = (arr, property, sortOption) => {
    // This function takes into account what the property to be compared is. 
    // If it is a price, then we need to be sure the values are numbers.
    // Otherwise, we need to be sure the values are lowercase.
    const comparisonStatement = (index, property) => {
        if (property === 'title' || property === 'author_name' || property === 'authors') {
            return arr[index][property].toLowerCase();
        } else {
            return Number(arr[index][property]);
        }
    }

    let isSwapped = false;

    for (let i = 0; i < arr.length - 1; i++) {
        isSwapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (sortOption === 'asc') {
                if (comparisonStatement(j, property) > comparisonStatement(j+1, property)) {
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    isSwapped = true;
                }
            } else {
                if (comparisonStatement(j, property) < comparisonStatement(j+1, property)) {
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    isSwapped = true;
                }
            }
        }

        if (isSwapped === false) {
            break;
        }
    }

    return arr;
}

// ------------------- SELECTORS ------------------- //
export const selectFreeBooks = (state) => {
    return state.admin.awaitingProducts !== undefined ? state.admin.awaitingProducts.filter(elem => { 
        return elem.price === '0.00';
    }) : [];
}

// export const selectnewReleases = (state) => {
//     const year = new Date().getFullYear();

//     return state.admin.awaitingProducts !== undefined ? state.admin.awaitingProducts.filter(elem => { 
//         return (elem.date_published <= year && elem.date_published >= year - 2);
//     }) : [];
// }

export const selectSortedAscByTitle = (state) => {
    return state.admin.awaitingProducts !== undefined ? bubbleSort([...state.admin.awaitingProducts], 'title', 'asc') : [];
}

export const selectSortedDescByTitle = (state) => {
    return state.admin.awaitingProducts !== undefined ? bubbleSort([...state.admin.awaitingProducts], 'title', 'desc') : [];
}

export const selectSortedAscByPrice = (state) => {
    return state.admin.awaitingProducts !== undefined ? bubbleSort([...state.admin.awaitingProducts], 'price', 'asc') : [];
}

export const selectSortedDescByPrice = (state) => {
    return state.admin.awaitingProducts !== undefined ? bubbleSort([...state.admin.awaitingProducts], 'price', 'desc') : [];
}

export const selectSortedAscByAuthor = (state) => {
    return state.admin.awaitingProducts !== undefined ? bubbleSort([...state.admin.awaitingProducts], 'author_name', 'asc') : [];
}

export const selectSortedDescByAuthor = (state) => {
    return state.admin.awaitingProducts !== undefined ? bubbleSort([...state.admin.awaitingProducts], 'author_name', 'desc') : [];
}


export const selectFreeExistingBooks = (state) => {
    return state.admin.existingProducts !== undefined ? state.admin.existingProducts.filter(elem => { 
        return elem.price === '0.00';
    }) : [];
}

export const selectnewExistingReleases = (state) => {
    const year = new Date().getFullYear();

    return state.admin.existingProducts !== undefined ? state.admin.existingProducts.filter(elem => { 
        return (elem.date_published <= year && elem.date_published >= year - 2);
    }) : [];
}

export const selectExistingSortedAscByTitle = (state) => {
    return state.admin.existingProducts !== undefined ? bubbleSort([...state.admin.existingProducts], 'title', 'asc') : [];
}

export const selectExistingSortedDescByTitle = (state) => {
    return state.admin.existingProducts !== undefined ? bubbleSort([...state.admin.existingProducts], 'title', 'desc') : [];
}

export const selectExistingSortedAscByPrice = (state) => {
    return state.admin.existingProducts !== undefined ? bubbleSort([...state.admin.existingProducts], 'price', 'asc') : [];
}

export const selectExistingSortedDescByPrice = (state) => {
    return state.admin.existingProducts !== undefined ? bubbleSort([...state.admin.existingProducts], 'price', 'desc') : [];
}

export const selectExistingSortedAscByAuthor = (state) => {
    return state.admin.existingProducts !== undefined ? bubbleSort([...state.admin.existingProducts], 'authors', 'asc') : [];
}

export const selectExistingSortedDescByAuthor = (state) => {
    return state.admin.existingProducts !== undefined ? bubbleSort([...state.admin.existingProducts], 'authors', 'desc') : [];
}

export const { addAwaitingItemToExisting, addNewProduct } = productsAdminSlice.actions;

export default productsAdminSlice.reducer;
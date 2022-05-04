import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            return [...state, action.payload];
        },
        removeProduct: (state, action) => {
            return state.filter(product => product.product_id !== action.payload.product_id);
        },
        removeAllProducts() {

        }
    }
});

export const selectAllProducts = (state) => { return state.cart }

export const { addProduct, removeProduct, removeAllProducts } = cartSlice.actions;
export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "products",
    initialState: {
        productsList: [],
        filteredProducts: [],
        cart: [],
        loadingStatus: "initial",
    },
    reducers: {
        loadProducts: (state, value) => {
            state.productsList = value.payload;
        },
        loadCartList: (state, value) => {
            state.cart = value.payload;
        },

        setProductsLoadingState: (state, value) => {
            state.loadingStatus = value.payload;
        },

    },
});

export const {
    loadProducts,
    loadCartList,
    setProductsLoadingState,
} = appSlice.actions;

export default appSlice.reducer;

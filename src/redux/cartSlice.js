import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartBackend } from "../configs/axios";

const initialState = {
    data: {},
    loading: false,
    error: false
};

export const fetchCartData = createAsyncThunk('cart/get_data', async () => {
    const { data } = await cartBackend.get('/mycart');
    return data;
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.data = {};
            state.loading = false;
            state.error = false;
        }
    }
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
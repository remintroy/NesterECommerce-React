import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: {
        path: null,
        message: null,
    }
}

export const navBarSlice = createSlice({
    name: 'navBar',
    initialState,
    reducers: {
        clearNavBar: (state) => {
            state.data = {
                path: "/",
                message: null,
            }
        },
        setNavBarData: (state, action) => {
            state.data = { ...action.payload };
        }
    }
});

export const { clearNavBar, setNavBarData } = navBarSlice.actions;

export default navBarSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        message: "WLCM_5T",
        error: false,
        action: "Ok",
        success: false
    }
};

export const notiSlice = createSlice({
    name: 'noti',
    initialState,
    reducers: {
        clearNoti: (state) => {
            state.data.message = "WLCM_5T";
            state.data.error = false;
            state.data.action = "OK";
            state.data.success = false;
        },
        pushNoti: (state, action) => {
            state.data = {
                message: action.payload?.message ?? "",
                error: action.payload?.error ?? false,
                action: action.payload?.action ?? "OK",
                success: action.payload?.success ?? false
            };
        }
    }
});

export const { clearNoti, pushNoti } = notiSlice.actions;

export default notiSlice.reducer;


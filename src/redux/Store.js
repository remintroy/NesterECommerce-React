import { configureStore } from "@reduxjs/toolkit";
import navBarSlice from "./navBarSlice";
import notiSlice from "./notiSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        noti: notiSlice,
        navBar: navBarSlice
    }
})
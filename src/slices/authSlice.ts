import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: localStorage.getItem("accessToken") ? JSON.parse(localStorage.getItem("accessToken")!) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload;
            localStorage.setItem("accessToken", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.accessToken = null;
            localStorage.removeItem("accessToken");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
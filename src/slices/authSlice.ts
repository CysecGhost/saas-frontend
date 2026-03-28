import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: localStorage.getItem("accessToken") ? JSON.parse(localStorage.getItem("accessToken")!) : null,
    orgId: localStorage.getItem("orgId") ? JSON.parse(localStorage.getItem("orgId")!) : null,
    role: localStorage.getItem("role") ? JSON.parse(localStorage.getItem("role")!) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload;
            localStorage.setItem("accessToken", JSON.stringify(action.payload));
        },
        setOrgId: (state, action) => {
            state.orgId = action.payload;
            localStorage.setItem("orgId", JSON.stringify(action.payload));
        },
        setRole: (state, action) => {
            state.role = action.payload;
            localStorage.setItem("role", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.accessToken = null;
            state.orgId = null;
            state.role = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("orgId");
            localStorage.removeItem("role");
        },
    },
});

export const { setCredentials, setOrgId, setRole, logout } = authSlice.actions;

export default authSlice.reducer;
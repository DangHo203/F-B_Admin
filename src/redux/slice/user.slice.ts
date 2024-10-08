import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        token: "",
        isLogin: false,
        id: "",
        role: "",
    },
    reducers: {
        login: (state, action) => {
        ;
            state.token = action.payload.token;
            state.isLogin = true;
            state.id = action.payload.id;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.id = "";
            state.token = "";
            state.role = "";
            state.isLogin = false;
        },
    },
});

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;

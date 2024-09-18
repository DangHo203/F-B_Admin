import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        token: "",
        isLogin: false,
        id: "",
    },
    reducers: {
        login: (state, action) => {
            console.log(action.payload);
            state.token = action.payload.token;
            state.isLogin = true;
            state.id = action.payload.id;
        },
        logout: (state) => {
            state.id = "";
            state.token = "";
            state.isLogin = false;
        },
    },
});

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;

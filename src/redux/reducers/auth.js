import {createSlice} from "@reduxjs/toolkit";

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false
    },
    reducers: {
        login: state => {
            state.isAuth = true
        },
        logout: state => {
            state.isAuth = false
        },
    }
})

export const { login, logout } = authReducer.actions
export default authReducer.reducer

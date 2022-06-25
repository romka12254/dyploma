import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        isAdmin: false,
        isAuth: false,
        isRegular: false,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.isAuth = true
            state.isAdmin = action.payload.role === 'admin'
            state.isRegular = action.payload.role === 'regular'
            state.user = {...action.payload}
        },
        logout: state => {
            state.isAuth = false
            state.isAdmin = false
            state.isRegular = false
            state.user = null
            toast('Ви успішно вийшли з аккаунту', {
                type: 'info',
                theme: 'colored'
            })
        },
    }
})

export const { login, logout } = authReducer.actions
export default authReducer.reducer

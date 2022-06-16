import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.isAuth = true
            state.user = {...action.payload}
        },
        logout: state => {
            state.isAuth = false
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

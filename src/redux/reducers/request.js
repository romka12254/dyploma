import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const requestReducer = createSlice({
    name: 'request',
    initialState: {
        data: null,
    },
    reducers: {
        setRequest: (state, action) => {
            state.data = {...action.payload}
        },
    }
})

export const { setRequest } = requestReducer.actions
export default requestReducer.reducer

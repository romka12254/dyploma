import {createSlice} from "@reduxjs/toolkit";

const usersReducer = createSlice({
    name: 'users',
    initialState: {
        list: []
    },
    reducers: {
        setUsers: (state, action) => {
            state.list = [...action.payload]
        },
    }
})

export const { setUsers } = usersReducer.actions
export default usersReducer.reducer

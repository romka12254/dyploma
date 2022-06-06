import {createSlice} from "@reduxjs/toolkit";

const cartReducer = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, {payload}) => {
            state.items.push(payload)
        },
        removeFromCart: (state, {payload}) => {
            state.items = state.items.filter(i => i !== payload)
        }
    }
})

export const { addToCart, removeFromCart } = cartReducer.actions
export default cartReducer.reducer

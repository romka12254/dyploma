import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './createReducers'

export default configureStore({
    reducer: rootReducer
})
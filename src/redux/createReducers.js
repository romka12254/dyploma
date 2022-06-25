import {combineReducers} from "redux";
import auth from './reducers/auth'
import cart from './reducers/cart'
import users from './reducers/users'
import requests from './reducers/request'

export default combineReducers({
    auth,
    cart,
    users,
    requests
})

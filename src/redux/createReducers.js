import {combineReducers} from "redux";
import auth from './reducers/auth'
import users from './reducers/users'
import requests from './reducers/request'

export default combineReducers({
    auth,
    users,
    requests
})

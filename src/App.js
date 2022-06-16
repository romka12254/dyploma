import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Route, Routes} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import Login from "./pages/login/login";
import Main from "./pages/main/main";
import Register from "./pages/register/register";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {ToastContainer} from "react-toastify";
import {login} from "./redux/reducers/auth";
import 'react-toastify/dist/ReactToastify.css';
import './App.css'


const App = () => {
    const {isAuth} = useSelector(store => store.auth)
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const {pathname} = useLocation()

    const checkUser = () => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const {email, uid: id} = user
                dispatch(login({
                    email, id
                }))
            }
        })
    }

    useEffect(() => {
        checkUser()
    }, [])

    // useEffect(() => {
    //     if (!isAuth) {
    //         navigate('/login')
    //     }
    // }, [isAuth])

    const isAuthPage = pathname.includes('login') || pathname.includes('register')

    return (
        <div className='app'>
            {/*{isAuth && <Main />}*/}
            {!isAuthPage && <Main/>}
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
            <ToastContainer />
        </div>
    );
};

export default App;

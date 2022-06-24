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
import {doc, getDoc} from "firebase/firestore";
import {db} from "./services/base";
import 'react-toastify/dist/ReactToastify.css';
import './App.css'


const App = () => {
    const {isAuth} = useSelector(store => store.auth)
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const {pathname} = useLocation()

    const checkUser = () => {
        const auth = getAuth()
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const {uid: id} = user
                const docRef = doc(db, 'users', id)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    dispatch(login({
                        id, ...docSnap.data()
                    }))
                }
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

import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Route, Routes} from "react-router";
import {useSelector} from "react-redux";
import Auth from "./pages/auth/auth";
import Main from "./pages/main/main";
import './App.css'


const App = () => {
    // const {isAuth} = useSelector(store => store.auth)
    // const navigate = useNavigate()

    // useEffect(() => {
    //     if (!isAuth) {
    //         navigate('/auth')
    //     }
    // }, [isAuth])

    return (
        <div className='app'>
            {/*{isAuth && <Main />}*/}
            <Main />
            <Routes>
                <Route path='/auth' element={<Auth />} />
            </Routes>
        </div>
    );
};

export default App;
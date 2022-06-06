import React, {useEffect} from "react";
import {Layout} from 'antd';
import Menu from "../../components/menu/menu";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Employees from "../../components/employees";
import Employee from "../../components/employee/employee";
import Cart from '../../components/cart/cart'

const {Header, Content, Footer} = Layout;


const Main = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (pathname === '/') {
            navigate('/employees')
        }
    })

    return <Layout
        style={{
            minHeight: '100vh',
        }}
    >
        <Menu/>
        <Layout className="site-layout">
            <Header
                className="site-layout-background"
                style={{
                    padding: 0,
                }}
            />
            <Content
                style={{
                    margin: '16px',
                }}
            >
                <Routes>
                    <Route path='/employees' element={<Employees/>}/>
                    <Route path='/employees/:employeeId' element={<Employee/>}/>
                    <Route path='/cart' element={<Cart />}/>
                    <Route path='/contacts' element={<div>contacts page here</div>}/>
                </Routes>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Адвокатське бюро 2022 created by Roman Melnyk PI-60
            </Footer>
        </Layout>
    </Layout>
}

export default Main
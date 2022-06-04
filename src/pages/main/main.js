import React, {useEffect} from "react";
import {Layout} from 'antd';
import Menu from "../../components/menu/menu";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Employees from "../../components/employees";
import Employee from "../../components/employee/employee";

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
                {/*<Breadcrumb*/}
                {/*    style={{*/}
                {/*        margin: '16px 0',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Breadcrumb.Item>User</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}
                <Routes>
                    <Route path='/employees' element={<Employees/>}/>
                    <Route path='/employees/:employeeId' element={<Employee/>}/>
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
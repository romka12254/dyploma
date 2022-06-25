import React, {useEffect} from "react";
import {Layout, PageHeader} from 'antd';
import Menu from "../../components/menu/menu";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Employees from "../../components/employees";
import Employee from "../../components/employee/employee";
import Users from '../../components/users/users'
import User from '../../components/user/user'
import {useSelector} from "react-redux";
import Profile from "../../components/profile/profile";
import Contacts from "../../components/contacts/contacts";
import RequestPage from "../../components/requestPage/requestPage";
import RequestsPage from "../../components/requestsPage/requestsPage";
import AboutUs from "../../components/aboutUs/aboutUs";

const {Header, Content, Footer} = Layout;


const Main = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const { isAdmin, isAuth, isRegular } = useSelector(store => store.auth)

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
            <PageHeader
                className="site-page-header"
                onBack={() => navigate(-1)}
                title="Назад"
                subTitle="Повернення до попередньої сторінки"
            />
            <Content
                style={{
                    margin: '16px',
                }}
            >
                <Routes>
                    <Route path='about-us' element={<AboutUs />} />
                    {isAuth && <Route path='/profile' element={<Profile />} />}
                    {isRegular && <Route path='request-page' element={<RequestPage />} />}
                    {isAdmin && <Route path='/users' element={<Users />} />}
                    {isAdmin && <Route path='/users/:userId' element={<User />} />}
                    {isAdmin && <Route path='/requests-page' element={<RequestsPage />} />}
                    <Route path='/employees' element={<Employees/>}/>
                    <Route path='/employees/:employeeId' element={<Employee/>}/>
                    <Route path='contacts' element={<Contacts />} />
                    <Route path='contacts/:contactId' element={<Contacts />} />
                    {/*<Route path='/contacts' element={<Contacts/>}/>*/}
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

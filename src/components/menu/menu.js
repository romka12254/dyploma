import React, {useEffect, useState} from "react";
import {logout} from "../../redux/reducers/auth";
import {useDispatch, useSelector} from "react-redux";
import {Layout, Menu as AntMenu} from "antd";

import {
    SearchOutlined,
    ContainerOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    LoginOutlined,
    UserOutlined
} from '@ant-design/icons';
import {useLocation, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import {toast} from "react-toastify";

const {Sider} = Layout


const Menu = () => {
    const dispatch = useDispatch()
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const {isAuth, isAdmin} = useSelector(store => store.auth)

    const [collapsed, setCollapsed] = useState(false);
    const [activePage, setActivePage] = useState(null)

    const makeLogout = () => {
        const auth = getAuth()
        signOut(auth)
            .then(() => {
                dispatch(logout())
            })
            .catch(() => {
                toast('Сталася помилка', {
                    type: 'error',
                    theme: 'colored'
                })
            })
    }

    const getItems = () => {
        const items = [
            {
                key: '0',
                label: 'Співробітиники',
                icon: <SearchOutlined />,
                path: 'employees',
                onClick: () => {
                    navigate('/employees')
                }
            },
            {
                key: '1',
                label: 'Кошик',
                icon: <ShoppingCartOutlined />,
                path: 'cart',
                onClick: () => {
                    navigate('/cart')
                }
            },
            {
                key: '2',
                label: 'Контакти',
                icon: <ContainerOutlined />,
                path: 'contacts',
                onClick: () => {
                    navigate('/contacts')
                }
            },
            {
                key: '3',
                label: isAuth ? 'Вихід' : 'Вхід',
                icon: isAuth ? <LogoutOutlined /> : <LoginOutlined />,
                path: 'auth',
                onClick: () => {
                    isAuth ? makeLogout() : navigate('/login')
                }
            },
        ]

        if (isAdmin) {
            items.unshift( {
                key: '4',
                label: 'Користувачі',
                icon: <UserOutlined />,
                path: 'users',
                onClick: () => {
                    navigate('/users')
                }
            })
        }

        if (isAuth) {
            items.unshift({
                key: '5',
                label: 'Профіль',
                icon: <UserOutlined />,
                path: 'profile',
                onClick: () => {
                    navigate('/profile')
                }
            },)
        }

        return items
    }

    const getActivePage = () => {
        const items = getItems()
        const active = items.find(i => pathname.includes(i.path))
        return active?.key
    }

    useEffect(() => {
        setActivePage(getActivePage())
    }, [pathname, isAdmin, isAuth])

    return <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo"/>
        <AntMenu
            selectedKeys={[activePage?.toString()]}
            mode="inline"
            theme="dark"
            items={getItems()}
        />
    </Sider>
}

export default Menu

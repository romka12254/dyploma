import React, {useEffect, useState} from "react";
import {logout} from "../../redux/reducers/auth";
import {useDispatch, useSelector} from "react-redux";
import {Layout, Menu as AntMenu} from "antd";

import {
    SearchOutlined,
    ContainerOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    LoginOutlined
} from '@ant-design/icons';
import {useLocation, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import {toast} from "react-toastify";
import {authErrors} from "../../consts/errorsLabels";

const {Sider} = Layout


const Menu = () => {
    const dispatch = useDispatch()
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const {isAuth} = useSelector(store => store.auth)

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

    const getActivePage = () => {
        const pages = ['employees', 'cart', 'contacts']
        let key
        pages.forEach((i, index) => {
            if (pathname.includes(i)) {
                key = index
            }
        })
        return key
    }

    useEffect(() => {
        setActivePage(getActivePage())
    }, [pathname])

    const items = [
        {
            key: '0',
            label: 'Співробітиники',
            icon: <SearchOutlined />,
            onClick: () => {
                navigate('/employees')
            }
        },
        {
            key: '1',
            label: 'Кошик',
            icon: <ShoppingCartOutlined />,
            onClick: () => {
                navigate('/cart')
            }
        },
        {
            key: '2',
            label: 'Контакти',
            icon: <ContainerOutlined />,
            onClick: () => {
                navigate('/contacts')
            }
        },
        {
            key: '3',
            label: isAuth ? 'Вихід' : 'Вхід',
            icon: isAuth ? <LogoutOutlined /> : <LoginOutlined />,
            onClick: () => {
                isAuth ? makeLogout() : navigate('/login')
            }
        },
    ]

    return <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo"/>
        <AntMenu
            selectedKeys={[activePage?.toString()]}
            mode="inline"
            theme="dark"
            items={items}
        />
    </Sider>
}

export default Menu

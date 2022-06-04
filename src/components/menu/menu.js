import React, {useEffect, useState} from "react";
import {logout} from "../../redux/reducers/auth";
import {useDispatch} from "react-redux";
import {Layout, Menu as AntMenu} from "antd";

import {
    SearchOutlined,
    ContainerOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import {useLocation, useNavigate} from "react-router-dom";

const {Sider} = Layout


const Menu = () => {
    const dispatch = useDispatch()
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const [activePage, setActivePage] = useState(null)

    const getActivePage = () => {
        const pages = ['employees', 'contacts']
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
            label: 'Контакти',
            icon: <ContainerOutlined />,
            onClick: () => {
                navigate('/contacts')
            }
        },
        {
            key: '2',
            label: 'Вихід',
            icon: <LogoutOutlined />,
            onClick: () => {
                dispatch(logout())
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
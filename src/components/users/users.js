import React, {useEffect, useState} from 'react'
import {collection, getDocs, doc, deleteDoc} from "firebase/firestore";
import {db, secondaryApp} from "../../services/base";
import {useDispatch, useSelector} from "react-redux";
import {setUsers} from "../../redux/reducers/users";
import {List, Skeleton, Avatar, Button, Table} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {ArrowRightOutlined, DeleteOutlined, SettingOutlined} from "@ant-design/icons";
import {getAuth, deleteUser, signInWithEmailAndPassword} from "firebase/auth";
import {ROLES, SPECIALIZATIONS} from "../../consts/user";

const Users = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { list: users } = useSelector(store => store.users)
    const [loading, setLoading] = useState(false)

    const getUsers = async () => {
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, "users"));
        const list = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            if (data.role !== 'admin') {
                list.push({
                    id: doc.id, ...doc.data()
                })
            }
        });
        dispatch(setUsers(list))
        setLoading(false)
    }

    useEffect(() => {
        getUsers()
    }, [])

    const removeUser = ({email, password, id}) => {
        setLoading(true)
        const auth = getAuth(secondaryApp)
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                deleteUser(user)
                    .then(async () => {
                        await deleteDoc(doc(db, 'users', id))
                        await getUsers()
                        setLoading(false)
                    })
                    .catch(() => {
                        setLoading(false)
                    })
            })
    }

    const columns = [
        {
            title: 'Імʼя',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Призвіще',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
            render: (role) => ROLES.find(j => j.value === role)?.label
        },
        {
            title: 'Спеціалізація',
            dataIndex: 'specializations',
            key: 'specializations',
            render: (list) => list.map(i => SPECIALIZATIONS.find(j => j.value === i)?.label).join(', ')
        },
        {
            title: <SettingOutlined />,
            dataIndex: '',
            key: 'x',
            align: 'center',
            fixed: 'right',
            render: (item) => [
                <Button
                    style={{ marginRight: '10px' }}
                    type="danger"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        removeUser(item)
                        // dispatch(removeFromCart(item.id))
                    }}
                />,
                <Button
                    type="primary"
                    shape="circle"
                    icon={<ArrowRightOutlined />}
                    onClick={() => {
                        navigate(`/users/${item.id}`)
                    }}
                />,
            ],
        },
    ]

    return <div>
        <Table
            loading={loading}
            dataSource={users}
            columns={columns}
            footer={() => (
                <Button
                    style={{ margin: '0 auto', display: 'flex' }}
                    type='primary'
                    onClick={() => navigate('/users/new')}
                >Create new user</Button>
            )}
        />
    </div>
}

export default Users

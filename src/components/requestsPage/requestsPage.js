import React, {useEffect, useState} from 'react'
import {collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "../../services/base";
import {SettingOutlined, CloseOutlined, CheckOutlined} from "@ant-design/icons";
import {Avatar, Button, Spin, Table} from "antd";
import {SPECIALIZATIONS} from "../../consts/user";

const RequestsPage = () => {
    const [loading, setLoading] = useState(false)
    const [requests, setRequests] = useState([])

    const getRequests = async () => {
        const querySnapshot = await getDocs(collection(db, "requests"));
        const items = []
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() })
        });
        setRequests(items)
    }

    useEffect(() => {
        getRequests()
    }, [])

    const columns = [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            width: '40px',
            render: url => <Avatar src={url} />
        },
        {
            title: 'Спеціалізація',
            dataIndex: 'specializations',
            key: 'specializations',
            render: (list) => list.map(i => SPECIALIZATIONS.find(j => j.value === i)?.label).join(', ')        },
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
                    icon={<CloseOutlined />}
                    onClick={async () => {
                        setLoading(true)
                        await deleteDoc(doc(db, 'requests', item.id))
                        await getRequests()
                        setLoading(false)
                    }}
                />,
                <Button
                    type="primary"
                    shape="circle"
                    icon={<CheckOutlined />}
                    onClick={async () => {
                        setLoading(true)
                        const docRef = doc(db, 'users', item.id)
                        await updateDoc(docRef, {
                            role: 'employee',
                            specializations: item.specializations,
                            description: item.description,
                            avatarUrl: item.avatar
                        })
                        await deleteDoc(doc(db, 'requests', item.id))
                        await getRequests()
                        setLoading(false)
                        // navigate(`/users/${item.id}`)
                    }}
                />,
            ],
        },
    ]

    return <Spin spinning={loading}>
        <Table dataSource={requests} columns={columns} />
    </Spin>
}

export default RequestsPage

import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Card} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {employeesList} from "../../consts/employees";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../services/base";

const {Meta} = Card;

const Employee = () => {
    const navigate = useNavigate()
    const {employeeId} = useParams()
    const [employee, setEmployee] = useState({})

    const {firstName, lastName, avatarUrl, description, specializations, email} = employee

    const getEmployee = async () => {
        const docRef = doc(db, 'users', employeeId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setEmployee(docSnap.data())
        }
    }

    useEffect(() => {
        getEmployee()
    }, [])

    return <>
        <Breadcrumb
            style={{
                margin: '16px 0',
            }}
        >
            <Breadcrumb.Item>Співробітники</Breadcrumb.Item>
            <Breadcrumb.Item>{firstName} {lastName}</Breadcrumb.Item>
        </Breadcrumb>
        <Card
            hoverable
            // cover={}
        >
            <div style={{ display: 'flex' }}>
                {/*<Button*/}
                {/*    style={{ margin: '0 10px 0 -10px' }}*/}
                {/*    type="primary"*/}
                {/*    shape="circle"*/}
                {/*    icon={<ArrowLeftOutlined />}*/}
                {/*    onClick={() => {*/}
                {/*        navigate(-1)*/}
                {/*    }}*/}
                {/*/>*/}
                <Meta title={email} description={description} />
                <img
                    style={{
                        marginLeft: '50px',
                        width: '300px'
                    }}
                    alt="example"
                    src={avatarUrl}
                />
            </div>
        </Card>
    </>
}

export default Employee
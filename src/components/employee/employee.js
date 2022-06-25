import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Card} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../services/base";
import {SPECIALIZATIONS} from "../../consts/user";

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
        <div style={{ display: 'flex', background: '#fff', padding: '15px' }}>
            <img style={{marginRight: '20px'}}   height='500px' src={avatarUrl} />
            <div>
                <h1 style={{ fontSize: '30px' }} >{firstName} {lastName}</h1>
                <div style={{ fontSize: '20px', marginBottom: '15px' }}><b>Почта:</b> {email}</div>
                <div style={{ fontSize: '20px', marginBottom: '15px' }}><b>Спеціалізація:</b> {specializations?.map(i => SPECIALIZATIONS.find(j => j.value === i)?.label).join(', ')}</div>
                <div>{description}</div>
            </div>
            <Button type="primary" onClick={() => {navigate(`/contacts/${employeeId}`)}}>Залишити заявку</Button>
        </div>
    </>
}

export default Employee

import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db, secondaryApp} from "../../services/base";
import {Button, Col, Form, Input, Row, Select, Spin} from "antd";
import {ROLES, SPECIALIZATIONS} from "../../consts/user";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {toast} from "react-toastify";
import './user.css'


const { Option } = Select;


const User = () => {
    const [form] = Form.useForm()
    const { userId } = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const isNew = userId === 'new'

    useEffect(() => {
        const setUser = async () => {
            const docRef = doc(db, 'users', userId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const fields = []
                const user = docSnap.data()
                for (let key in user) {
                    fields.push({
                        name: key,
                        value: user[key]
                    })
                }
                form.setFields(fields)
            }
        }
        if (!isNew) {
            setUser()
        }
    }, [])

    const handleUpdate = async () => {
        try {
            setLoading(true)
            const userRef = doc(db, 'users', userId)

            await updateDoc(userRef, {
                ...form.getFieldsValue()
            })

            setLoading(false)

            toast('Ви успішно оновили аккаунт', {
                type: 'success',
                theme: 'colored'
            })
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const handleCreate = async () => {
        const auth = getAuth(secondaryApp)
        const formValues = form.getFieldsValue()
        const {email, password} = formValues
        try {
            setLoading(true)
            const {user} = await createUserWithEmailAndPassword(auth, email, password)

            if (user) {
                const {uid: id} = user
                await setDoc(doc(db, 'users', id), {...formValues})

                setLoading(false)
                toast('Ви успішно створили аккаунт', {
                    type: 'success',
                    theme: 'colored'
                })

                navigate('/users')
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    return <div className='user-form'>
        <Spin spinning={loading}>
            <Form form={form} layout='vertical'>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label='Імʼя' name='firstName'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='Призвіще' name='lastName'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='Email' name='email'>
                            <Input />
                        </Form.Item>
                    </Col>
                    {isNew && <Col span={12}>
                        <Form.Item label='Пароль' name='password'>
                            <Input type='password' />
                        </Form.Item>
                    </Col>}
                    <Col span={12}>
                        <Form.Item label='Роль' name='role'>
                            <Select>
                                {ROLES.map(r => (
                                    <Option key={r.value} value={r.value}>{r.label}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Form.Item shouldUpdate noStyle>
                        {() => form.getFieldValue('role') === 'employee' && <Col span={12}>
                            <Form.Item label='Спеціалізація' name='specializations'>
                                <Select mode='multiple'>
                                    {SPECIALIZATIONS.map(r => (
                                        <Option key={r.value} value={r.value}>{r.label}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>}
                    </Form.Item>
                    <Col span={24}>
                        <Button
                            style={{ width: '100%' }}
                            type="primary"
                            onClick={isNew ? handleCreate : handleUpdate}
                        >
                            {isNew ? "Create" : "Update"}
                        </Button>
                    </Col>
                </Row>
                {/*  specialization here  */}
            </Form>
        </Spin>
    </div>
}

export default User

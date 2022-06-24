import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Input, Row, Spin} from "antd";
import {useSelector} from "react-redux";
import {getAuth, updateEmail, updateCurrentUser, signInWithEmailAndPassword} from "firebase/auth";
import {doc, updateDoc} from "firebase/firestore";
import {db, secondaryApp} from "../../services/base";

const Profile = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const {user} = useSelector(store => store.auth)

    const setUserFields = () => {
        setLoading(true)
        const fields = []
        for (let key in user) {
            fields.push({
                name: key,
                value: user[key]
            })
        }
        form.setFields(fields)
        setLoading(false)
    }

    useEffect(() => {
        setUserFields()
    }, [user])

    const handleSubmit = async (values) => {
        setLoading(true)
        const userRef = doc(db, 'users', user.id)

        await updateDoc(userRef, {
            ...values
        })

        setLoading(false)
    }

    return <div style={{maxWidth: '750px', margin: '0 auto'}}>
        <Spin spinning={loading}>
            <Form layout='vertical' form={form} onFinish={handleSubmit}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label='Імʼя' name='firstName'>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='Призвіще' name='lastName'>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='Email' name='email'>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
                            <Button style={{width: '100%'}} type="primary" htmlType="submit">
                                Оновити
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Spin>
    </div>
}

export default Profile

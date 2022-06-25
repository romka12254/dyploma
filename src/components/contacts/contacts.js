import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Input, Row, Select} from "antd";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../services/base";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const {Option} = Select

const Contacts = () => {
    const [form] = Form.useForm()
    const {contactId} = useParams()
    const {user} = useSelector(store => store.auth)
    const [employees, setEmployees] = useState([])

    const getEmployees = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const items = []
        querySnapshot.forEach((doc) => {
            const docData = doc.data()
            if (docData.role === 'employee') {
                items.push({ id: doc.id, ...docData })
            }
        });
        setEmployees(items)
    }

    useEffect(() => {
        getEmployees()
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            employee: contactId
        })
    }, [contactId])

    useEffect(() => {
        if (user?.email) {
            form.setFieldsValue({
                email: user.email
            })
        }
    }, [user])

    return <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        <Form
            form={form}
            layout='vertical'
            requiredMark={false}
            onFinish={() => {
                form.resetFields()
                toast('Заявка успішно подана. Очікуйте відповідь на вказану вами почту', {
                    type: 'success',
                    theme: 'colored'
                })}
            }
        >
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        label='Виберіть свівробітника'
                        name='employee'
                        rules={[{ required: true, message: 'Виберіть співробітника!' }]}
                    >
                        <Select>
                            {employees.map(e => (
                                <Option value={e.id}>{e.firstName} {e.lastName}</Option>
                            ))}
                            <Option value='technical'>Технічна підтримка</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='Вкажіть вашу електронну адресу'
                        name='email'
                        rules={[{ required: true, message: 'Неправильно вказана почта!', type: 'email' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label='Розпишіть вашу проблему'
                        name='issue'
                        rules={[{ required: true, message: 'Вкажіть вашу проблему!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Button
                            type='primary'
                            style={{ width: '100%' }}
                            htmlType="submit"
                        >Відправити заявку</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </div>
}

export default Contacts

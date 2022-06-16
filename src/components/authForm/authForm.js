import React from "react";
import {Button, Divider, Form, Input} from "antd";
import {Link} from "react-router-dom";


const AuthForm = ({ submit, link }) => {

    return <div className='auth-page'>
        <Form
            layout='vertical'
            requiredMark={false}
            onFinish={submit}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Email address is incorrect!', type: 'email' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link to='/'>
                    На головну
                </Link>

                <Divider type='vertical' />

                {link}
            </div>
        </Form>
    </div>
}

export default AuthForm

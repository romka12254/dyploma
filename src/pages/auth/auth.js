import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {login} from "../../redux/reducers/auth";
import {useNavigate} from "react-router-dom";
import './index.css'

const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className='auth-page'>
            <Form
                layout='vertical'
                requiredMark={false}
                onFinish={() => {
                    dispatch(login())
                    navigate('/')
                }}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
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

                {/*<Form.Item name="remember" valuePropName="checked">*/}
                {/*    <Checkbox>Remember me</Checkbox>*/}
                {/*</Form.Item>*/}

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Auth
import React, {useState} from 'react';
import "./contacts.css";
import {Typography, message, Input, Space, Card, Row, Col } from "antd";
import {MailOutlined, PhoneFilled} from "@ant-design/icons";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../services/base";
const { Title } = Typography;

const Contacts = () => {
    const [message, setMessage] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        text: ''
    });

    const sendMessage = async (e) => {
        e.preventDefault();
        const docRef = doc(db, "admin", "messages");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await updateDoc(docRef, {
                messages: {...docSnap.messages, message}
            });
        } else {
            await setDoc(doc(db, 'admin', 'messages'), {
                messages: [message]
            });
        }
        message.success('Повідомлення надіслано');
    };

    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex', marginBottom:'20px' }}>
                <Card title='Контакти' size="small">
                    <Title level={5}><MailOutlined className='icon' />
                        pi60_mri@student.ztu.edu.ua
                    </Title>
                    <br/>
                    <Title level={5}><PhoneFilled className='icon' />
                        <a href="tel:+380 98 125 0060">+380 98 125 0060</a>
                    </Title>
                </Card>
            </Space>
            <Space direction="vertical" size="middle" style={{ display: 'flex', marginBottom:'20px', width:'35%'}}>
                <Card title='Залиште нам повідомлення' size="small">
                    <form onSubmit={() => sendMessage()}>
                        <Row className='row'>
                            <Col span={12} className='col'>
                                <input
                                    type='text'
                                    required
                                    placeholder="Ім'я"
                                    value={message.firstName}
                                    onChange={e => setMessage({...message, firstName: e.target.value})}
                                />
                            </Col>
                            <Col span={12} className='col'>
                                <input
                                    type='text'
                                    required
                                    placeholder="Фамілія"
                                    value={message.lastName}
                                    onChange={e => setMessage({...message, lastName: e.target.value})}
                                />
                            </Col>
                        </Row>
                        <br/>
                        <Row className='row'>
                            <Col span={12} className='col'>
                                <input
                                    type='email'
                                    required
                                    placeholder="Email"
                                    value={message.email}
                                    onChange={e => setMessage({...message, email: e.target.value})}
                                />
                            </Col>
                            <Col span={12} className='col'>
                                <input
                                    type="tel"
                                    required
                                    placeholder="Номер телефону"
                                    value={message.phone}
                                    onChange={e => setMessage({...message, phone: e.target.value})}
                                />
                            </Col>
                        </Row>
                        <Row className='row'>
                            <Col span={24} className='col'>
                                <textarea
                                    style={{width:'100%'}}
                                    required
                                    placeholder="Повідомлення"
                                    value={message.text}
                                    onChange={e => setMessage({...message, text: e.target.value})}
                                />
                            </Col>
                        </Row>
                        <Row className='row'>
                            <Col span={24} className='col'>
                                <button type='submit'>Надіслати</button>
                            </Col>
                        </Row>
                    </form>
                </Card>
            </Space>
        </>
    );
};

export default Contacts;
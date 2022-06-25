import React, {useState} from 'react'
import {Button, Col, Form, Input, Row, Select, Spin, Upload} from "antd";
import {
    UploadOutlined
} from '@ant-design/icons'
import {SPECIALIZATIONS} from "../../consts/user";
import {db, storage} from "../../services/base";
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {useDispatch, useSelector} from "react-redux";
import {doc, setDoc} from "firebase/firestore";
import {setRequest} from "../../redux/reducers/request";
import './index.css'

const {Option} = Select

const RequestPage = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const {user} = useSelector(store => store.auth)
    const {data: request} = useSelector(store => store.requests)

    console.log(request)

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
    };

    const handleSubmit = ({ avatar, specializations, description }) => {
        setLoading(true)
        try {
            avatar = avatar?.[0]
            const avatarName = new Date().getTime() + avatar?.name
            const storageRef = ref(storage, avatarName)
            const uploadImage = uploadBytesResumable(storageRef, avatar?.originFileObj)

            uploadImage.on('state_changed',
                (snapshot) => {},
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadImage.snapshot.ref).then(async (downloadURL) => {
                        const payload = {
                            avatar: downloadURL,
                            specializations, description
                        }
                        await setDoc(doc(db, 'requests', user.id), payload)
                        dispatch(setRequest(payload))
                        setLoading(false)
                    });
                }
            );
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    return <div style={{maxWidth: '750px', margin: '0 auto'}}>
        <Spin spinning={loading}>
            {request?.avatar ? (
                'Запит на заявку відправлено, очікуйте...'
            ) : (
                <Form layout='vertical' onFinish={handleSubmit}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="avatar"
                                label="Фото"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload
                                    name="logo"
                                    listType="picture"
                                    accept="image/png, image/gif, image/jpeg"
                                >
                                    <Button
                                        style={{width: '100%'}}
                                        icon={<UploadOutlined/>}
                                    >Натисніть щоб завантажити</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Спеціалізація' name='specializations'>
                                <Select mode='multiple'>
                                    {SPECIALIZATIONS.map(r => (
                                        <Option key={r.value} value={r.value}>{r.label}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name='description' label='Опис'>
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )}
        </Spin>
    </div>
}

export default RequestPage

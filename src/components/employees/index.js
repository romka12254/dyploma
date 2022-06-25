import React, {useEffect, useState} from "react";
import {Avatar, Breadcrumb, Button, Card, Col, notification, Row, Select} from "antd";
import {useNavigate} from "react-router-dom";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../services/base";
import './index.css'
import {SPECIALIZATIONS} from "../../consts/user";

const {Meta} = Card;
const {Option} = Select

const Employees = () => {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState(null)
    const [specialization, setSpecialization] = useState(null)

    const getEmployees = async (spec) => {
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

    const filterEmployees = async (specialization) => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const items = []
        querySnapshot.forEach((doc) => {
            const docData = doc.data()
            if (docData.role === 'employee' && docData.specializations?.includes?.(specialization)) {
                items.push({ id: doc.id, ...docData })
            }
        });
        setEmployees(items)
    }

    useEffect(() => {
        getEmployees()
    }, [])


    useEffect(() => {
        filterEmployees(specialization)
    }, [specialization])

    return <>
        <Breadcrumb
            style={{
                margin: '16px 0',
            }}
        >
            <Breadcrumb.Item>Співробітники</Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={[16, 24]}>
            <Col span={24}>
                Виберіть спеціалізацію
                <Select onChange={value => setSpecialization(value)} style={{ width: '100%' }}>
                    {SPECIALIZATIONS.map(s => (
                        <Option value={s.value}>{SPECIALIZATIONS.find(j => j.value === s)?.label}</Option>
                    ))}
                </Select>
            </Col>
            {employees && employees?.map(({avatarUrl, firstName, lastName, description, id}) => (
                <Col key={id} xs={24} md={12} xl={8} xxl={6}>
                    <Card
                        cover={<Avatar src={avatarUrl} style={{ height: '200px', width: '200px', marginTop: '15px' }} />}
                    >
                        <Meta title={`${firstName} ${lastName}`} description={description}/>
                        <div className="card-footer">
                            <Button
                                type='primary'
                                onClick={() => {
                                    navigate(`/employees/${id}`)
                                }}
                            >Перейти</Button>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    </>
}

export default Employees

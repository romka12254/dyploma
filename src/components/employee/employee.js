import React from "react";
import {Breadcrumb, Button, Card} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {employeesList} from "../../consts/employees";
import {ArrowLeftOutlined} from "@ant-design/icons";

const {Meta} = Card;

const Employee = () => {
    const navigate = useNavigate()
    const {employeeId} = useParams()
    const {name, description, img} = employeesList.find(e => e.id === employeeId)
    return <>
        <Breadcrumb
            style={{
                margin: '16px 0',
            }}
        >
            <Breadcrumb.Item>Співробітники</Breadcrumb.Item>
            <Breadcrumb.Item>{name}</Breadcrumb.Item>
        </Breadcrumb>
        <Card
            hoverable
            // cover={}
        >
            <div style={{ display: 'flex' }}>
                <Button
                    style={{ margin: '0 10px 0 -10px' }}
                    type="primary"
                    shape="circle"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => {
                        navigate(-1)
                    }}
                />
                <Meta title={name} description={description} />
                <img
                    style={{
                        marginLeft: '50px',
                        width: '300px'
                    }}
                    alt="example"
                    src={img}
                />
            </div>
        </Card>
    </>
}

export default Employee
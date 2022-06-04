import React from "react";
import {Card, Col, Row} from "antd";
import {employeesList} from "../../consts/employees";
import {useNavigate} from "react-router-dom";

const {Meta} = Card;

const Employees = () => {
    const navigate = useNavigate()
    return <Row gutter={[16, 24]}>
        {employeesList.map(({id, name, description, img}, i) => (
            <Col key={i} span={6}>
                <Card
                    onClick={() => {
                        navigate(`/employees/${id}`)
                    }}
                    hoverable
                    cover={<img alt="example" src={img} />}
                >
                    <Meta title={name} description={description} />
                </Card>
            </Col>
        ))}
    </Row>
}

export default Employees
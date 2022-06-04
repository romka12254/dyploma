import React from "react";
import {Card} from "antd";
import {useParams} from "react-router-dom";
import {employeesList} from "../../consts/employees";

const {Meta} = Card;

const Employee = () => {
    const {employeeId} = useParams()
    const {name, description, img} = employeesList.find(e => e.id === employeeId)
    return <Card
        hoverable
        cover={<img
            style={{
                margin: '24px 24px 0',
                width: '300px'
            }}
            alt="example"
            src={img}
        />
        }
    >
        <Meta title={name} description={description} />
    </Card>
}

export default Employee
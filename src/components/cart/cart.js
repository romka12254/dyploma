import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {employeesList} from "../../consts/employees";
import {removeFromCart} from "../../redux/reducers/cart";
import {Breadcrumb, Button, Card, List} from "antd";
import {DeleteOutlined, ArrowRightOutlined} from '@ant-design/icons'
import {useNavigate} from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {items: cart} = useSelector(store => store.cart)

    const employeesFromCart = employeesList.filter(e => cart.includes(e.id))

    return <>
        <Breadcrumb
            style={{
                margin: '16px 0',
            }}
        >
            <Breadcrumb.Item>Кошик</Breadcrumb.Item>
        </Breadcrumb>
        <div>
            <List
                grid={{
                    gutter: 16,
                    // xs: 24,
                    // md: 12,
                    // xl: 8,
                    // xxl: 6,
                }}
                dataSource={employeesFromCart}
                renderItem={item => (
                    <List.Item>
                        <Card title={
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div className="name">{item.name}</div>
                                <div>
                                    <Button
                                        style={{ marginRight: '10px' }}
                                        type="primary"
                                        shape="circle"
                                        icon={<ArrowRightOutlined />}
                                        onClick={() => {
                                            navigate(`/employees/${item.id}`)
                                        }}
                                    />
                                    <Button
                                        type="danger"
                                        shape="circle"
                                        icon={<DeleteOutlined />}
                                        onClick={() => {
                                            dispatch(removeFromCart(item.id))
                                        }}
                                    />
                                </div>
                            </div>
                        }>
                            {item.description}
                        </Card>
                    </List.Item>
                )}
            />
            <Button
                style={{ display: 'flex', margin: '0 auto' }}
                size='large'
                type="primary"
                disabled={!employeesFromCart.length}
            >Оформити замовлення</Button>
        </div>
    </>
}

export default Cart
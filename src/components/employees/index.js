import React from "react";
import {Breadcrumb, Button, Card, Col, notification, Row} from "antd";
import {employeesList} from "../../consts/employees";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './index.css'
import {addToCart, removeFromCart} from "../../redux/reducers/cart";

const {Meta} = Card;

const Employees = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {items: cart} = useSelector(store => store.cart)

    return <>
        <Breadcrumb
            style={{
                margin: '16px 0',
            }}
        >
            <Breadcrumb.Item>Співробітники</Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={[16, 24]}>
            {employeesList.map(({id, name, description, img}, i) => {
                const isInCart = cart.includes(id)
                return (
                    <Col key={i} xs={24} md={12} xl={8} xxl={6}>
                        <Card
                            // hoverable
                            cover={<img alt="example" src={img}/>}
                        >
                            <Meta title={name} description={description}/>
                            <div className="card-footer">
                                <Button
                                    type='danger'
                                    onClick={() => {
                                        isInCart
                                            ? notification.error({ message: 'Ви успішно видалили елемент з кошика' })
                                            : notification.success({ message: 'Ви успішно додали елемент до кошика' })
                                        dispatch(
                                            isInCart ? removeFromCart(id) : addToCart(id)
                                        )
                                    }}
                                >{
                                    isInCart ? 'Видалити з кошика' : 'У кошик'
                                }</Button>
                                <Button
                                    type='primary'
                                    onClick={() => {
                                        navigate(`/employees/${id}`)
                                    }}
                                >Перейти</Button>
                            </div>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    </>
}

export default Employees

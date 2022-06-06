import React from "react";
import {Button, Card, Col, Row} from "antd";
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

    return <Row gutter={[16, 24]}>
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
}

export default Employees

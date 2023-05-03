import { CloseOutlined, MinusSquareOutlined, PlusSquareOutlined, RightOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Divider, Form, Image, Input, Modal, notification, Row, Space } from 'antd';
import Grid from 'antd/es/card/Grid';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../../../../apis';
// import { productAPI } from '../../apis';
import imaginecartempty from '../../../../assets/image/cart-empty.png';
import Header from '../../share/header/Header';
import Notification from '../../share/notification/Notification';

const Cart = () => {
    localStorage.removeItem('checklist');
    const user = JSON.parse(localStorage.getItem('user'));
    const checkedlist = localStorage.getItem('checked');
    const [carts, setCart] = useState([]);
    const [newCarts, setNewCarts] = useState([]);
    const userId = user.userId;
    const cartUrl = 'https://localhost:44303/api/Carts';
    const navigate = useNavigate();
    let checkeds = [];
    const [total, setTotal] = useState(0);
    const [checkList, setCheckList] = useState([]);
    if (checkedlist) {
        checkeds = localStorage.getItem('checked').split(',');
    }
    // lấy toàn bộ sản phẩm trong cart theo userId
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(cartUrl);
            const data = response.data;
            const filter = data.filter((item) => item['userId'] === userId);
            setCart(filter);
            const inputData = [];
            var sumTotal = 0;
            console.log(checkeds);
            for (const i in filter) {
                if (checkeds.includes(filter[i].productId + '')) {
                    inputData.push({ ...filter[i], checked: true });
                    sumTotal += filter[i].quantity * filter[i].price;
                } else {
                    inputData.push({ ...filter[i], checked: false });
                }
            }
            setCart(inputData);
            setTotal(sumTotal);
        };
        fetchData();
    }, []);
    // xử lý cộng hàng hóa
    function handlerUp(getCart) {
        const count = getCart.quantity;
        const fetchData = async () => {
            const product = await productAPI.getDetail(getCart.productId);
            console.log('data', product.data);
            if (count + 1 > product.data.inventoryNumber) return;
            else {
                getCart.quantity = count + 1;
                try {
                    axios.put(`${cartUrl}/${getCart.id}`, getCart);
                } catch (err) {
                    Notification({
                        message :'Vui lòng chọn ít nhất một sản phẩm',
                        type:'error',
                    })
                }
                window.location.reload();
            }
        };
        fetchData();
    }
    // xóa hàng hóa
    function deleteCartHandler(index) {
        async function deleteHandler() {
            await axios.delete(`${cartUrl}/${index}`);
            window.location.reload();
        }
        deleteHandler();
    }
    // xử lý trừ hàng hóa
    function handlerDown(getCart) {
        const count = getCart.quantity;
        if (count > 1) {
            getCart.quantity = count - 1;
        }
        try {
            axios.put(`${cartUrl}/${getCart.id}`, getCart);
            window.location.reload();
        } catch (err) {
            Notification({
                message :'Vui lòng chọn ít nhất một sản phẩm',
                type:'error',
            })
        }
    }
    // xử lý checkbox
    function handlerCheckBox(e, index) {
        const newCarts = [...carts];
        newCarts[index].checked = e.target.value;
        setCart(newCarts);
        if (e.target.checked) {
            setTotal(total + Number(e.target.value));
        } else {
            setTotal(total - Number(e.target.value));
        }
    }
    const checkoutHandler = () => {
        let listcart = [];
        const checkboxs = document.getElementsByClassName('checkbox');
        localStorage.setItem('checklist', checkList);
        for (var i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].checked) {
                listcart.push(Number(checkboxs[i].name));
            }
        }
        if (listcart.length === 0)
        Notification({
            message :'Vui lòng chọn ít nhất một sản phẩm',
            type:'warning',
        })
        else {
            setCheckList(listcart);
            localStorage.removeItem('checklist');
            localStorage.setItem('checklist', listcart);
            navigate('/shop/checkout');
        }
    };

    // xử lý modal
    const [open, setOpen] = useState(false);
    const [cartIdDelete, setCartIdDelete] = useState();
    const showModal = (cartid) => {
        setCartIdDelete(cartid);
        setOpen(true);
    };
    const handleOk = () => {
        async function deleteHandler() {
            try {
                await axios.delete(`${cartUrl}/${cartIdDelete}`);
                window.location.reload();
                Notification({
                    message :'Xóa sản phẩm thành công',
                    type:'success',
                })
            } catch (err) {
                Notification({
                    message :'Có lỗi, xin vui lòng thử lại!',
                    type:'error',
                })
            }
            setOpen(false);
        }
        deleteHandler();
    };
    const handleCancel = () => {
        setOpen(false);
    };
    
    return (
        <>
        <Header></Header>
            <Grid style={{  padding: '40px' ,display:'block'}} >
                <Row span={24}>
                    <Col span={12} offset={2}>
                        <Grid>
                            <Space size={20}>
                                <h3>
                                    {' '}
                                    Trang chủ <RightOutlined /> Giỏ hàng
                                </h3>
                            </Space>
                            <br />
                            <Space>
                                <h2 style={{ paddingTop: '20px' }}>Giỏ hàng của bạn</h2>
                            </Space>
                            {carts ? (
                                carts.map((cart, index) => (
                                    <Card style={{ width: '100%', height: 'auto', marginBottom: '10px' }}>
                                        <Row style={{ display: 'flex', justifyContent: 'right' }}>
                                            <Button type="link">
                                                <CloseOutlined
                                                    style={{ color: 'red'}}
                                                    onClick={() => showModal(cart.id)}
                                                />
                                            </Button>
                                        </Row>
                                        <Row align="middle" span={24} style={{ marginBottom: '10px' }}>
                                            <Col span={4}>
                                                <Image width={80} src={cart.image} />
                                            </Col>
                                            <Col span={19} offset={1}>
                                                <Link
                                                    className="reset-anchor h6 animsition-link"
                                                    to={`/shop/product/detail/${cart.productId}`}
                                                >
                                                    <Content style={{ fontSize: '16px' }}>{cart.name} </Content>
                                                </Link>
                                                <Space
                                                    style={{
                                                        justifyContent: 'space-around',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <h4> {cart.price} VND</h4>
                                                    <h4>Số lượng :</h4>
                                                    <Space
                                                        style={{
                                                            justifyContent: 'flex-start',
                                                            display: 'flex',
                                                            padding: '0px',
                                                        }}
                                                    >
                                                        <Button
                                                            icon={<MinusSquareOutlined />}
                                                            type="link"
                                                            onClick={() => handlerDown(cart)}
                                                        ></Button>
                                                        <Input
                                                            style={{ width: '40px' }}
                                                            size="small"
                                                            disabled
                                                            value={cart.quantity}
                                                        ></Input>
                                                        <Button
                                                            icon={<PlusSquareOutlined />}
                                                            type="link"
                                                            onClick={() => handlerUp(cart)}
                                                        ></Button>
                                                    </Space>
                                                    <h4>{cart.quantity * cart.price} VND</h4>
                                                    <input
                                                        className="checkbox"
                                                        type="checkbox"
                                                        value={cart.price * cart.quantity}
                                                        name={cart.id}
                                                        id={`checked${cart.productId}`}
                                                        onChange={(e) => handlerCheckBox(e, index)}
                                                        defaultChecked={cart.checked}
                                                    />
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Card>
                                ))
                            ) : (
                                <Grid
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        marginBottom: '10px',
                                        justifyContent: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <Image src={imaginecartempty}></Image>
                                </Grid>
                            )}
                        </Grid>
                        <Divider />
                        <Link to="/shop">
                            <Button primary>Tiếp tục mua sắm</Button>
                        </Link>
                    </Col>
                    <Col span={6} offset={3} style={{ background: '#FAFAFA', padding: '10px 20px' }}>
                        {carts.map((cart, index) => (
                            <Row align="middle" span={16} style={{ marginBottom: '20px' }}>
                                <Col span={4}>
                                    <Badge count={cart.quantity}>
                                        <Image width={60} src={cart.image} />
                                    </Badge>
                                </Col>
                                <Col span={8} offset={3}>
                                    <Content>{cart.name}</Content>
                                </Col>
                                <Col span={4} offset={2}>
                                    <Space>{cart.quantity * cart.price} VND</Space>    
                                </Col>
                            </Row>
                        ))}

                        <hr />
                        <Row align="middle" span={24} layout="inline">
                            <Col span={12} style={{ padding: '10px 0px' }}>
                                Tạm tính
                            </Col>
                            <Col span={12}>{total} VND</Col>
                        </Row>
                        <Row align="middle" span={24}>
                            <Col span={12}>Phí vận chuyển</Col>
                            <Col span={12}>-</Col>
                        </Row>
                        <Divider />
                        <Row align="middle" span={24}>
                            <Col span={12}>
                                <h3>Tổng cộng</h3>
                            </Col>
                            <Col span={12}>{total} VND</Col>
                        </Row>
                        <Divider />
                        <Row align="middle" style={{ justifyContent: 'center' }}>
                            <Button type="primary" danger onClick={checkoutHandler}>
                                THANH TOÁN NGAY
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Grid>
            <Modal
                title="Bạn có muốn xóa sản phẩm này không ?"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
            ></Modal>
        </>
    );
};

export default Cart;

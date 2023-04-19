import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../share/header/Header';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../../../../apis';
import moment from 'moment';
import { RightOutlined } from '@ant-design/icons';
import { Badge, Button, Col, Divider, Form, Image, Input, Radio, Row, Select, Space } from 'antd';
import Grid from 'antd/es/card/Grid';
import { Content } from 'antd/es/layout/layout';
import { Option } from 'antd/es/mentions';
import { useCallAPI } from '../../share/common/useCallAPI';
import tinh_tp from './address/tinh_tp.json';
import quan_huyen from './address/quan_huyen.json';
import xa_phuong from './address/xa_phuong.json';

const Checkout = () => {
    const cartUrl = 'https://localhost:44303/api/Carts';
    const orderUrl = 'https://localhost:44303/api/Order';
    const itemUrl = 'https://localhost:44303/api/OrderDetail';
    const productUrl = 'https://localhost:44303/api/Products';
    const UserUrl = 'https://localhost:44303/api/Users';
    const PaymentUrl="https://localhost:44303/api/Payment/request-payment";
    var checkList = localStorage.getItem('checklist').split(',');
    const user = JSON.parse(localStorage.getItem('user'));

    const userId = user.userId;
    const navigate = useNavigate();
    const [carts, setCart] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [total, setTotal] = useState(0);
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState();
    const [delivery, setDelivery] = useState();
    const {
        data: userInfor,
        loading,
        error,
    } = useCallAPI(`${UserUrl}/${userId}`, (data) => {
        var uuid = require('uuid');
        const order_id = uuid.v4();
        form.setFieldsValue({
            id: order_id,
            name: data.fullName,
            email: data.email,
            phone: data.phone,
            type_payment: 'a',
            userId: userId,
            address: address,
            total: total,
            status: false,
            delivery: false,
            createAt: new Date().toISOString(),
            finish: false,
            cancel: false,
            finishAt: null,
        });
    });

    //form
    const [form] = Form.useForm();

    // console.log(moment(new Date()).format('DD:MM:yyyy hh:mm:ss'));
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(cartUrl);
            const data = response.data;
            const filter = data.filter((item) => item['userId'] === userId);
            const filter2 = filter.filter((item) => checkList.includes(`${item['id']}`));

            setCart(filter2);
            if (filter2.length !== 0) {
                var result = 0;
                for (var i = 0; i < filter2.length; i++) {
                    const tt = Number(filter2[i].quantity) * Number(filter2[i].price);
                    result = result + tt;
                }
                setTotal(result);
            }
        };
        fetchData();
    }, []);

    // const handlerSubmit = async () => {
    //     if (name === '' || address === '' || phone === '') {
    //         alert('Bạn phải nhập đầy đủ thông tin');
    //     } else {
    //         var uuid = require('uuid');
    //         const order_id = uuid.v4();
    //         var error = '';
    //         const postOrder = {
    //             id: order_id,
    //             userId: userId,
    //             name: name,
    //             address: address,
    //             phone: phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/) ? phone : '',
    //             total: total,
    //             status: false,
    //             delivery: false,
    //             createAt: new Date().toISOString(),
    //             finish: false,
    //             cancel: false,
    //             finishAt: null,
    //         };
    //         if (postOrder.phone == '') {
    //             error = 'Số điện thoại không đúng format';
    //         }

    //         try {
    //             if (error == '') {
    //                 await axios.post(orderUrl, postOrder);
    //                 var length = carts.length;
    //                 for (var i = 0; i < length; i++) {
    //                     const postItem = {
    //                         orderId: order_id,
    //                         productId: carts[i].productId,
    //                         quantity: carts[i].quantity,
    //                         price: carts[i].price,
    //                         image: carts[i].image,
    //                         productName: carts[i].name,
    //                         feedback: false,
    //                     };
    //                     try {
    //                         await axios.post(itemUrl, postItem);
    //                         await axios.delete(`${cartUrl}/${carts[i].id}`);
    //                     } catch (err) {
    //                         alert('có lỗi');
    //                     }
    //                 }
    //                 alert('Đặt hàng thành công!');
    //                 localStorage.removeItem(checkList);
    //                 navigate('/shop/orderlist');
    //             } else {
    //                 alert('Số điện thoại không đúng format');
    //             }
    //         } catch (err) {
    //             alert('Có lỗi, xin vui lòng thử lại!');
    //         }
    //         for (var i = 0; i < length; i++) {
    //             const sl = carts[i].quantity;
    //             const id = carts[i].productId;
    //             handlerProduct(sl, id);
    //         }
    //     }
    // };
    function handlerProduct(sl, id) {
        const fetchData = async () => {
            const product = await productAPI.getDetail(id);
            const oldnum = product.data.inventoryNumber;
            product.data.inventoryNumber = oldnum - sl;
            try {
                axios.put(`${productUrl}/${id}`, product.data);
            } catch (err) {
                alert('Có lỗi, xin vui lòng thử lại!');
            }
        };
        fetchData();
    }
    // navigate to cart
    function cartHandler() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user === null) return navigate('/login');
        return navigate('/shop/cart');
    }

    //handle submit form
    const onFinish = async(values) => {
        console.log('Received values of form:', values);
        console.log('form:', form);
        console.log("id :", form.getFieldValue('id'));
        
            let postOrder = {
                id: form.getFieldValue('id'),
                userId: userId,
                name: values.name,
                address: values.address,
                phone: values.phone,
                total: total,
                status: false,
                delivery: false,
                createAt: new Date().toISOString(),
                finish: false,
                cancel: false,
                finishAt: null,
            };

            await axios.post(orderUrl, postOrder);

            try {
                if (form.type_payment == 'a') {
                    var length = carts.length;
                    for (var i = 0; i < length; i++) {
                        const postItem = {
                            orderId: form.getFieldValue('id'),
                            productId: carts[i].productId,
                            quantity: carts[i].quantity,
                            price: carts[i].price,
                            image: carts[i].image,
                            productName: carts[i].name,
                            feedback: false,
                        };
                        try {
                            await axios.post(itemUrl, postItem);
                            await axios.delete(`${cartUrl}/${carts[i].id}`);
                        } catch (err) {
                            alert('có lỗi');
                        }
                    }
                } else {
                    console.log("vao day");
                    const object = {
                        paymentType: 'string',
                        paymentDescription: 'string',
                        orderId: form.getFieldValue('id'),
                    };
                    const x= await axios.post(PaymentUrl, object);
                    console.log("🚀 ~ file: Checkout.jsx:219 ~ onFinish ~ x:", x)
                    window.open(x.data);
                }
                alert('Đặt hàng thành công!');
                // localStorage.removeItem(checkList);
                // navigate('/shop/orderlist');
                for (var i = 0; i < length; i++) {
                    const sl = carts[i].quantity;
                    const id = carts[i].productId;
                    handlerProduct(sl, id);
                }
            } catch (err) {
                alert('Có lỗi, xin vui lòng thử lại!');
            }

  
    };

    const [tinh, setTinh] = useState(
        Object.keys(tinh_tp).map((key) => {
            return { name: Number(key), value: tinh_tp[key].name };
        }),
    );
    const [quan, setQuan] = useState();
    const [xa, setXa] = useState();

    // handleChangeProvince
    const handleChangeProvince = (key, value) => {
        let tmp = [];
        Object.keys(quan_huyen).filter((key1) => {
            if (quan_huyen[key1].parent_code == value.name) {
                tmp.push(quan_huyen[key1]);
            }
        });
        setQuan(
            tmp.map((e) => {
                return { name: e.code, value: e.name };
            }),
        );
    };

    // handleChangeDistricts
    const handleChangeDistricts = (key, value) => {
        let tmp = [];
        Object.keys(xa_phuong).filter((key1) => {
            if (xa_phuong[key1].parent_code == value.name) {
                tmp.push(xa_phuong[key1]);
            }
        });
        setXa(
            tmp.map((e) => {
                return { name: e.code, value: e.name };
            }),
        );
    }
    return (
        <div>
            <Header></Header>
            {/* <div className="shop">
                <div className="shop_block">
                    <div className="shop_block_text">Checkout</div>
                    <div className="shop_block_text_sm">NetFarm</div>
                </div>
                <div className="shopping_cart_btns">
                    <Link to="/shop">
                        <button className="shopping_cart_btn">
                            <i className="fa-solid fa-arrow-left shopping_cart_btn_icon"></i>
                            Continue Shopping
                        </button>
                    </Link>
                </div>
                <div className="checkout_container">
                    <div className="checkout_block">
                        <div>
                            <div className="checkout_header"> Thông tin đơn hàng</div>
                            <div className="checkout_row">
                                <div className="checkout_item">Tên người nhận</div>
                                <input
                                    className="checkout_input"
                                    placeholder="Nhập tên người nhận hàng ..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    name="name"
                                    required
                                ></input>
                            </div>
                            <div className="checkout_row">
                                <div className="checkout_item">Địa chỉ</div>
                                <input
                                    className="checkout_input"
                                    placeholder="Nhập địa chỉ nhận hàng"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    name="address"
                                    required
                                ></input>
                            </div>
                            <div className="checkout_row">
                                <div className="checkout_item">Số điện thoại</div>
                                <input
                                    type={'number'}
                                    className="checkout_input"
                                    placeholder="Nhập số điện thoại"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    name="phone"
                                    required
                                ></input>
                            </div>
                            <div className="cart_content">
                                <div className="checkout_list">
                                    <div className="section_title">PRODUCT LIST</div>
                                    <div className="shopping_cart_table">
                                        <div className="table-responsive mb-4">
                                            <table className="listcart_table">
                                                <thead className="bg-light">
                                                    <tr className="text-center">
                                                        <th className="border-0" scope="col">
                                                            {' '}
                                                            <strong className="text-small text-uppercase">Ảnh</strong>
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                            {' '}
                                                            <strong className="text-small text-uppercase">
                                                                Sản Phẩm
                                                            </strong>
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                            {' '}
                                                            <strong className="text-small text-uppercase">Giá</strong>
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                            {' '}
                                                            <strong className="text-small text-uppercase">
                                                                Số Lượng
                                                            </strong>
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                            {' '}
                                                            <strong className="text-small text-uppercase">
                                                                Thành tiền
                                                            </strong>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {carts.map((cart, index) => (
                                                        <tr className="text-center" key={index}>
                                                            <td className="td_content">
                                                                <div className="">
                                                                    <Link className="" to={`/shop/product/detail/1`}>
                                                                        <img src={cart.image} alt="..." width="70" />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                            <td className="td_content">
                                                                <div className="">
                                                                    <Link
                                                                        className="reset-anchor h6 animsition-link"
                                                                        to={`/shop/product/detail/1`}
                                                                    >
                                                                        {cart.name}
                                                                    </Link>
                                                                </div>
                                                            </td>

                                                            <td className="td_content">
                                                                <p className="mb-0 small">{cart.price}đ</p>
                                                            </td>
                                                            <td className="td_content">
                                                                <p>{cart.quantity}</p>
                                                            </td>
                                                            <td className="td_content">
                                                                <p className="mb-0 small">
                                                                    {cart.quantity * cart.price}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="checkout_row_total">
                                <div className="checkout_item">Tổng số tiền thanh toán</div>
                                <div className="checkout_total">{total}đ</div>
                            </div>
                            <div className="checkout_row row_btn">
                                <button className="checkout_btn" onClick={handlerSubmit}>
                                    Đặt hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <Grid style={{ height: '570px', padding: '40px' }} className="space-align-container">
                <Row>
                    <Col span={12} offset={3}>
                        <Grid>
                            <Space size={20}>
                                <h3>
                                    {' '}
                                    Giỏ hàng <RightOutlined /> Thông tin giao hàng <RightOutlined /> Phương thức thanh
                                    toán
                                </h3>
                            </Space>
                            <Grid>
                                <h2 style={{ paddingTop: '20px' }}>Thông tin giao hàng</h2>
                            </Grid>
                            <Grid className="form">
                                {loading && userInfor ? (
                                    <></>
                                ) : (
                                    <Form style={{ maxWidth: 600 }} layout="vertical" onFinish={onFinish} form={form}>
                                        <Form.Item
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập tên người nhận!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Họ và tên người nhận" />
                                        </Form.Item>
                                        <Row span={24}>
                                            <Col span={12}>
                                                <Form.Item
                                                    name="email"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập email!',
                                                        },
                                                        {
                                                            type: 'email',
                                                            message: 'Email sai định dạng!',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Email" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={11} offset={1}>
                                                <Form.Item
                                                    name="phone"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập số điện thoại!',
                                                        },
                                                        {
                                                            pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                                                            message: 'Số điện thoại sai định dạng!',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Số điện thoại" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Form.Item
                                            name="address"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập địa chỉ nhận!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Địa chỉ" />
                                        </Form.Item>
                                        <Form.Item name="type_payment" label="Hình thức thanh toán">
                                            <Radio.Group>
                                                <Radio value="a" defaultChecked>
                                                    Thanh toán ngay khi nhận hàng
                                                </Radio>
                                                <Radio value="b">Thanh toán qua ví</Radio>
                                            </Radio.Group>
                                        </Form.Item>

                                        <Space>
                                            <Form.Item
                                                name="provinces"
                                                label="Tỉnh/ thành"
                                                // hasFeedback
                                                rules={[{ required: true, message: 'chọn tỉnh/ thành phố!' }]}
                                            >
                                                <Select
                                                    placeholder="tỉnh thành"
                                                    onChange={handleChangeProvince}
                                                    options={tinh}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name="districts"
                                                label="Quận/ huyện"
                                                // rules={[{ required: true, message: 'chọn quận/ huyện!' }]}
                                            >
                                                <Select
                                                    placeholder="chọn quận huyện"
                                                    options={quan}
                                                    onChange={handleChangeDistricts}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name="wards"
                                                label="Phường/ xã"
                                                // rules={[{ required: true, message: 'chọn phường/ xã!' }]}
                                            >
                                                <Select placeholder="chọn phường xã" options={xa} />
                                            </Form.Item>
                                        </Space>
                                        <Form.Item>
                                            <Space>
                                                <Button danger onClick={cartHandler}>
                                                    {' '}
                                                    Quay lại giỏ hàng
                                                </Button>
                                                <Button type="primary" htmlType="submit">
                                                    Thanh Toán
                                                </Button>
                                            </Space>
                                        </Form.Item>
                                    </Form>
                                )}
                            </Grid>
                        </Grid>
                    </Col>
                    <Col span={6} offset={1} style={{ background: '#FAFAFA', padding: '10px 20px' }}>
                        {carts.map((cart, index) => (
                            <Row align="middle" span={16} style={{ marginBottom: '10px' }}>
                                <Col span={4}>
                                    <Badge count={cart.quantity}>
                                        <Image width={60} src={cart.image} />
                                    </Badge>
                                </Col>
                                <Col span={8} offset={3}>
                                    <Content>{cart.name} </Content>
                                </Col>
                                <Col span={4} offset={3}>
                                    <Space>{cart.quantity * cart.price} VND</Space>
                                </Col>
                            </Row>
                        ))}

                        <Divider />
                        <Row span={24}>
                            <Form layout="inline">
                                <Col span={16}>
                                    <Form.Item>
                                        <Input placeholder="Mã giảm giá"></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item>
                                        <Button type="primary">Áp dụng</Button>
                                    </Form.Item>
                                </Col>
                            </Form>
                        </Row>
                        <Divider />
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
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

export default Checkout;

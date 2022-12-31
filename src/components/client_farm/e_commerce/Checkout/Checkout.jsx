import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../share/header/Header';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../../../../apis';
import moment from 'moment';
const Checkout = () => {
    const cartUrl = 'https://localhost:44303/api/Carts';
    const orderUrl = 'https://localhost:44303/api/Order';
    const itemUrl = 'https://localhost:44303/api/OrderDetail';
    const productUrl = 'https://localhost:44303/api/Products';
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
    // lấy toàn bộ sản phẩm trong cart theo userId

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

    const handlerSubmit = async () => {
        if (name === '' || address === '' || phone === '') {
            alert('Bạn phải nhập đầy đủ thông tin');
        } else {
            var uuid = require('uuid');
            const order_id = uuid.v4();
            var error = '';
            const postOrder = {
                id: order_id,
                userId: userId,
                name: name,
                address: address,
                phone: phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/) ? phone : '',
                total: total,
                status: false,
                delivery: false,
                createAt: new Date().toISOString(),
                finish: false,
                cancel: false,
                finishAt: null,
            };
            if (postOrder.phone == '') {
                error = 'Số điện thoại không đúng format';
            }

            try {
                if (error == '') {
                    await axios.post(orderUrl, postOrder);
                    var length = carts.length;
                    for (var i = 0; i < length; i++) {
                        const postItem = {
                            orderId: order_id,
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
                    alert('Đặt hàng thành công!');
                    localStorage.removeItem(checkList);
                    navigate('/shop/orderlist');
                } else {
                    alert('Số điện thoại không đúng format');
                }
            } catch (err) {
                alert('Có lỗi, xin vui lòng thử lại!');
            }
            for (var i = 0; i < length; i++) {
                const sl = carts[i].quantity;
                const id = carts[i].productId;
                handlerProduct(sl, id);
            }
        }
    };
    function handlerProduct(sl, id) {
        const fetchData = async () => {
            const product = await productAPI.getDetail(id);
            const oldnum = product.data.inventoryNumber;
            product.data.inventoryNumber = oldnum - sl;
            console.log(product.data);
            try {
                axios.put(`${productUrl}/${id}`, product.data);
            } catch (err) {
                alert('Có lỗi, xin vui lòng thử lại!');
            }
        };
        fetchData();
    }

    return (
        <div>
            <Header></Header>
            <div className="shop">
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
            </div>
        </div>
    );
};

export default Checkout;

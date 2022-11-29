import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../share/header/Header';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../../../../apis';
import '../css/style.css';
const Cart = () => {
    localStorage.removeItem('checklist');
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);
    const [carts, setCart] = useState([]);
    const userId = user.userId;
    const cartUrl = 'https://localhost:44303/api/Carts';
    const navigate = useNavigate();
    const checkedlist = localStorage.getItem('checked');
    var checkeds = [];
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
            var sumTotal = 0;
            if (checkeds) {
                for (var i = 0; i < checkeds.length; i++) {
                    const checked = document.getElementById(`checked${checkeds[i]}`);
                    if (checked) {
                        checked.checked = true;
                        sumTotal += Number(checked.value);
                    }
                }
            }
            setTotal(sumTotal);
        };
        fetchData();
    }, []);
    function handlerChangeText() {}
    function handlerUp(getCart) {
        const count = getCart.quantity;
        const fetchData = async () => {
            const product = await productAPI.getDetail(getCart.productId);
            console.log(product.data);
            if (count + 1 > product.data.inventoryNumber) return;
            else {
                getCart.quantity = count + 1;
                console.log(getCart);
                try {
                    axios.put(`${cartUrl}/${getCart.id}`, getCart);
                } catch (err) {
                    alert('Có lỗi, xin vui lòng thử lại!');
                }
                window.location.reload();
            }
        };
        fetchData();
    }

    function handlerDown(getCart) {
        const count = getCart.quantity;
        if (count > 1) {
            getCart.quantity = count - 1;
        }
        // carts.quantity = Number(getQuantity) + 1;
        try {
            axios.put(`${cartUrl}/${getCart.id}`, getCart);
            window.location.reload();
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    }

    // Phần này để xử lý xóa sản phẩm ra khỏi cart

    function deleteCartHandler(index) {
        async function deleteHandler() {
            await axios.delete(`${cartUrl}/${index}`);
            window.location.reload();
        }
        deleteHandler();
    }

    function handlerCheckBox(e) {
        if (e.target.checked) {
            setTotal(total + Number(e.target.value));
        } else {
            setTotal(total - Number(e.target.value));
        }
    }

    function checkoutHandler() {
        const listcart = [];
        const checkboxs = document.getElementsByClassName('checkbox');
        localStorage.setItem('checklist', checkList);
        for (var i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].checked) {
                listcart.push(Number(checkboxs[i].name));
            }
        }
        console.log(listcart);
        if (listcart.length === 0) return;
        else {
            setCheckList(listcart);
            localStorage.removeItem('checklist');
            localStorage.setItem('checklist', listcart);
            navigate('/shop/checkout');
        }
    }
    return (
        <div>
            <Header></Header>
            <div className="shop">
                <div className="shop_block">
                    <div className="shop_block_text">CART</div>
                    <div className="shop_block_text_sm">NetFarm</div>
                </div>
                <div className="cart_content">
                    <div className="shopping_cart">
                        <div className="section_cart_title">GIỎ HÀNG</div>
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
                                                <strong className="text-small text-uppercase">Sản Phẩm</strong>
                                            </th>
                                            <th className="border-0" scope="col">
                                                {' '}
                                                <strong className="text-small text-uppercase">Giá</strong>
                                            </th>
                                            <th className="border-0" scope="col">
                                                {' '}
                                                <strong className="text-small text-uppercase">Số Lượng</strong>
                                            </th>
                                            <th className="border-0" scope="col">
                                                {' '}
                                                <strong className="text-small text-uppercase">Thành tiền</strong>
                                            </th>
                                            <th className="border-0" scope="col">
                                                {' '}
                                                <strong className="text-small text-uppercase">Xóa</strong>
                                            </th>
                                            <th className="border-0" scope="col">
                                                {' '}
                                                <strong className="text-small text-uppercase">Chọn</strong>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carts.map((cart, index) => (
                                            <tr className="text-center" key={index}>
                                                <td className="td_content">
                                                    <div className="">
                                                        <Link
                                                            className=""
                                                            to={`/shop/product/detail/${cart.productId}`}
                                                        >
                                                            <img src={cart.image} alt="..." width="70" />
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="td_content">
                                                    <div className="">
                                                        <Link
                                                            className="reset-anchor h6 animsition-link"
                                                            to={`/shop/product/detail/${cart.productId}`}
                                                        >
                                                            {cart.name}
                                                        </Link>
                                                    </div>
                                                </td>

                                                <td className="td_content">
                                                    <p className="mb-0 small">{cart.price}đ</p>
                                                </td>
                                                <td className="td_content">
                                                    <div className="">
                                                        <button
                                                            className="dec-btn p-0"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handlerDown(cart)}
                                                        >
                                                            <i className="fas fa-caret-left"></i>
                                                        </button>
                                                        <input
                                                            className="quantity_box"
                                                            type="text"
                                                            value={cart.quantity}
                                                            onChange={handlerChangeText}
                                                        />
                                                        <button
                                                            className="inc-btn p-0"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handlerUp(cart)}
                                                        >
                                                            <i className="fas fa-caret-right"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="td_content">
                                                    <p className="mb-0 small">{cart.quantity * cart.price}</p>
                                                </td>
                                                <td className="td_content">
                                                    <a
                                                        className="reset-anchor remove_cart"
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <i
                                                            className="fas fa-trash-alt small text-muted"
                                                            onClick={() => deleteCartHandler(cart.id)}
                                                        ></i>
                                                    </a>
                                                </td>
                                                <td className="td_content">
                                                    <input
                                                        className="checkbox"
                                                        type="checkbox"
                                                        value={cart.quantity * cart.price}
                                                        name={cart.id}
                                                        id={`checked${cart.productId}`}
                                                        onChange={handlerCheckBox}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="shopping_cart_btns">
                            <Link to="/shop">
                                <button className="shopping_cart_btn">
                                    <i className="fa-solid fa-arrow-left shopping_cart_btn_icon"></i>
                                    Tiếp tục mua sắm
                                </button>
                            </Link>
                            <button className="shopping_cart_btn" onClick={checkoutHandler}>
                                Đặt hàng
                                <i className="fa-solid fa-arrow-right shopping_cart_btn_icon"></i>
                            </button>
                        </div>
                    </div>
                    <div className="cart_total">
                        <div className="section_cart_title"> TỔNG TIỀN</div>
                        <div className="total">
                            Thành tiền
                            <div className="total_value">{total}</div>
                        </div>
                        <form>
                            <div className="form_group">
                                <input className="form-control" type="text" placeholder="Enter your coupon" />
                                <button className="coupon_btn" type="submit">
                                    {' '}
                                    <i className="fas fa-gift mr-2"></i>Áp dụng khuyến mãi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

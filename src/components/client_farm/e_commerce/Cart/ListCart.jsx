import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function ListCart(props) {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const [carts, setCart] = useState([]);
    const userId = user.userId;
    const cartUrl = 'https://6351413b3e9fa1244e59b320.mockapi.io/cart';

    // lấy toàn bộ sản phẩm trong cart theo userId
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(cartUrl);
            const data = response.data;
            const filter = data.filter((item) => item['user_id'] === userId);
            setCart(filter);
        };
        fetchData();
    }, []);
    console.log('carts', carts);
    function handlerChangeText() {}

    // Phần này để xử lý xóa sản phẩm ra khỏi cart

    function deleteCartHandler(index) {
        async function deleteHandler() {
            await axios.delete(`${cartUrl}/${index}`);
            window.location.reload();
        }
        deleteHandler();
    }
    return (
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
                    {carts.map((cart) => (
                        <tr className="text-center">
                            <td className="td_content">
                                <div className="">
                                    <Link className="" to={`/shop/product/detail/1`}>
                                        <img src={cart.image} alt="..." width="70" />
                                    </Link>
                                </div>
                            </td>
                            <td className="td_content">
                                <div className="">
                                    <Link className="reset-anchor h6 animsition-link" to={`/shop/product/detail/1`}>
                                        {cart.product_name}
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
                                        // onClick={() => handlerDown(value.idUser, value.idProduct, value.count)}
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
                                        // onClick={() => handlerUp(value.idUser, value.idProduct, value.count)}
                                    >
                                        <i className="fas fa-caret-right"></i>
                                    </button>
                                </div>
                            </td>
                            <td className="td_content">
                                <p className="mb-0 small">{cart.quantity * cart.price}</p>
                            </td>
                            <td className="td_content">
                                <a className="reset-anchor remove_cart" style={{ cursor: 'pointer' }}>
                                    <i
                                        className="fas fa-trash-alt small text-muted"
                                        onClick={() => deleteCartHandler(cart.id)}
                                    ></i>
                                </a>
                            </td>
                            <td className="td_content">
                                <input type="checkbox" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ListCart;

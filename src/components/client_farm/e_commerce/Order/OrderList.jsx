import React, { useEffect, useState } from 'react';
import Order from './Order';
import Header from '../../share/header/Header';
import axios from 'axios';
import '../css/style.css';
const OrderList = () => {
    const orderURL = 'https://localhost:44303/api/Order';
    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const [orders, setOrders] = useState([]);
    // phần này dùng để lấy danh sách các đơn hàng.
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(orderURL);
            const data = response.data;
            const filter = data.filter((item) => item['userId'] === userId);
            setOrders(filter);
        };
        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <div className="orderList_container">
                <div className="OrderList_category">
                    <ul className="OrderList_type">
                        <li className="OrderList_item">Tất cả</li>
                        <li className="OrderList_item">Đã xác nhận</li>
                        <li className="OrderList_item">Đang giao</li>
                        <li className="OrderList_item">Đã giao</li>
                    </ul>
                </div>
                <div className="OrderList">
                    {orders
                        ? orders.map((order, index) => (
                              <Order order={order} key={order.id} update={order.id} number={index}></Order>
                          ))
                        : ''}
                </div>
            </div>
        </div>
    );
};

export default OrderList;

import React, { useEffect, useState } from 'react';
import Order from './Order';
import Header from '../../share/header/Header';
import axios from 'axios';
import '../css/style.css';
const OrderList = () => {
    const orderURL = 'https://localhost:44303/api/Order';
    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const [orders, setOrders] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    // phần này dùng để lấy danh sách các đơn hàng.
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(orderURL);
            const data = response.data;
            const filter = data.filter((item) => item['userId'] === userId);
            // console.log('list', filter);
            // Array(filter);
            filter.sort((a, b) => new Date(b['createAt']) - new Date(a['createAt']));
            setOrders(filter);
        };
        fetchData();
    }, []);

    function HanderFilter(value) {
        console.log(value);
        if (value === 'all') window.location.reload();
        if (value === 'choxacnhan') {
            setCurrentTab(1);
            const fetchData = async () => {
                const response = await axios.get(orderURL);
                const data = response.data;
                const filter = data.filter((item) => item['userId'] === userId && !item[`status`] && !item[`cancel`]);
                setOrders(filter);
            };
            fetchData();
        } else if (value === 'daxacnhan') {
            setCurrentTab(2);
            const fetchData = async () => {
                const response = await axios.get(orderURL);
                const data = response.data;
                const filter = data.filter(
                    (item) => item['userId'] === userId && item[`status`] && !item[`cancel`] && !item[`delivery`],
                );
                setOrders(filter);
            };
            fetchData();
        } else if (value === 'danggiao') {
            setCurrentTab(3);
            const fetchData = async () => {
                const response = await axios.get(orderURL);
                const data = response.data;
                const filter = data.filter((item) => item['userId'] === userId && item[`delivery`] && !item[`finish`]);
                setOrders(filter);
            };
            fetchData();
        } else if (value === 'dagiao') {
            setCurrentTab(4);
            const fetchData = async () => {
                const response = await axios.get(orderURL);
                const data = response.data;
                const filter = data.filter((item) => item['userId'] === userId && item[`finish`]);
                setOrders(filter);
            };
            fetchData();
        } else if (value === 'dahuy') {
            setCurrentTab(5);
            const fetchData = async () => {
                const response = await axios.get(orderURL);
                const data = response.data;
                const filter = data.filter((item) => item['userId'] === userId && item[`cancel`]);
                setOrders(filter);
            };
            fetchData();
        }
    }

    return (
        <div>
            <Header />
            <div className="orderList_container">
                <div className="OrderList_category">
                    <ul className="OrderList_type">
                        <li
                            className={currentTab === 0 ? 'OrderList_item_active' : 'OrderList_item'}
                            onClick={() => HanderFilter('all')}
                            value="all"
                        >
                            Tất cả
                        </li>
                        <li
                            className={currentTab === 1 ? 'OrderList_item_active' : 'OrderList_item'}
                            onClick={() => HanderFilter('choxacnhan')}
                            value="status"
                        >
                            Chờ xác nhận
                        </li>
                        <li
                            className={currentTab === 2 ? 'OrderList_item_active' : 'OrderList_item'}
                            onClick={() => HanderFilter('daxacnhan')}
                            value="delivery"
                        >
                            Đã xác nhận
                        </li>
                        <li
                            className={currentTab === 3 ? 'OrderList_item_active' : 'OrderList_item'}
                            onClick={() => HanderFilter('danggiao')}
                            value="finish"
                        >
                            Đang giao
                        </li>
                        <li
                            className={currentTab === 4 ? 'OrderList_item_active' : 'OrderList_item'}
                            onClick={() => HanderFilter('dagiao')}
                            value="finish"
                        >
                            Đã giao
                        </li>
                        <li
                            className={currentTab === 5 ? 'OrderList_item_active' : 'OrderList_item'}
                            onClick={() => HanderFilter('dahuy')}
                            value="cancel"
                        >
                            Đã hủy
                        </li>
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

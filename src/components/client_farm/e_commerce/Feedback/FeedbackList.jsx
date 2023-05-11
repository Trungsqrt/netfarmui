import { Layout } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewHeader from '../../share/newheader/NewHeader';
import '../css/style.css';
import Feedback from './Feedback';
const FeedbackList = (props) => {
    const detailUrl = 'https://localhost:44303/api/OrderDetail';
    const orderUrl = 'https://localhost:44303/api/Order';
    const [orders, setOrder] = useState([]);
    const [detailOrder, setDetailOrder] = useState([]);

    const { id } = useParams();

    // Phần này tìm những đơn hàng đã hoàn thành để tiến hành đánh giá
    useEffect(() => {
        const fetchData = async () => {
            console.log(id);
            const response = await axios.get(orderUrl);
            const data = response.data;
            const date = new Date();
            const filter = data.filter((item) => item['finish']);
            const orderIds = orders;
            var filterByOrderId = filter;
            if (id) {
                filterByOrderId = filter.filter((item) => item['id'] === id);
            }
            for (var i = 0; i < filterByOrderId.length; i++) {
                orderIds.push(filterByOrderId[i].id);
            }
            const orderitem = await axios.get(detailUrl);
            const filter2 = orderitem.data.filter((item) => orderIds.includes(item.orderId));
            const filter3 = filter2.filter((item) => !item.feedback);
            setOrder(orderIds);
            setDetailOrder(filter3);
            console.log('order.detail', filter2);
        };
        fetchData();
    }, [id]);

    return (
        <div>
            <Layout style={{ display: 'block', marginBottom: '100px' }}>
                <NewHeader></NewHeader>
            </Layout>
            <div className="feedList_container">
                {detailOrder
                    ? detailOrder.map((item, index) => (
                          <Feedback product={item} key={item.id} update={item.id} number={index}></Feedback>
                      ))
                    : ''}
            </div>
        </div>
    );
};

export default FeedbackList;

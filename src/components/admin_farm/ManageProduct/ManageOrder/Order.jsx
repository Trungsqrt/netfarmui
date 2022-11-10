import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/style.css';
import Header from '../../share/header/Header';
const Order = (props) => {
    const orderUrl = 'https://localhost:44303/api/Order';
    const itemUrl = 'https://localhost:44303/api/OrderDetail';
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [text, setText] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            console.log(id);
            const response = await axios.get(`${orderUrl}/${id}`);
            const data = response.data;
            if (data.status) {
                const orderbtn = document.getElementById('order_btn');
                orderbtn.classList.add('hiden_btn');
            }
            if (data.delivery) {
                const deliverybtn = document.getElementById('delivery_btn');
                deliverybtn.classList.add('hiden_btn');
            }

            if (data.cancle) {
                setText('Đã hủy');
            } else {
                {
                    console.log(data);
                    data.status
                        ? data.delivery
                            ? data.finish
                                ? setText('Đã giao')
                                : setText('Đang giao hàng')
                            : setText('Đã xác nhận - Chờ giao hàng')
                        : setText('Chờ xác nhận');
                }
            }

            setOrder(response.data);
        };
        fetchData();
    }, [id]);

    const [orderItems, setOrderItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(itemUrl);
            const data = response.data;
            const filter = data.filter((item) => item['orderId'] === id);
            setOrderItems(filter);
        };
        fetchData();
    }, []);

    function handleApproveOrder() {
        order.status = true;
        try {
            const putUrl = `${orderUrl}/${id}`;
            axios.put(putUrl, order);
            window.location.reload();
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    }

    function handleDelivery() {
        order.delivery = true;
        console.log(order);
        try {
            const putUrl = `${orderUrl}/${id}`;
            axios.put(putUrl, order);
            window.location.reload();
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    }
    return (
        <>
            <Header></Header>
            <div className="order_detail">
                <div className=" order_container">
                    <div className="order_header">
                        <div>Yêu thích</div>
                        <div>Tình trạng đơn hàng: {text}</div>
                    </div>
                    <div>
                        {orderItems
                            ? orderItems.map((item, index) => (
                                  <div className="order_item" key={index}>
                                      <img className="order_img" src={item.image}></img>
                                      <div className="order_content">
                                          <div className="order_name">{item.productName}</div>
                                          {/* <div className="order_category">Phân bón</div> */}
                                          <div className="order_quantity">x{item.quantity}</div>
                                      </div>
                                      <div className="order_itemprice">{item.price}Đ</div>
                                  </div>
                              ))
                            : ''}
                    </div>

                    <div className="order_footer">
                        <div className="order_start">*****</div>
                        <div className="order_total">
                            <div className="order_price">
                                <p className="order_price_text">Tổng số tiền: </p>
                                <p className="order_price_number">{order.total}</p>
                            </div>
                            <div>
                                <button
                                    id="order_btn"
                                    className="order_btn"
                                    onClick={handleApproveOrder}
                                    value={order.status}
                                >
                                    Xác nhận đơn hàng
                                </button>
                                <button
                                    id="delivery_btn"
                                    className="order_btn"
                                    onClick={handleDelivery}
                                    value={order.status}
                                >
                                    Xác nhận giao hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Order;

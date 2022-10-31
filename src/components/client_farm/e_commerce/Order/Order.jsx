import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/style.css';
const Order = (props) => {
    const orderUrl = 'https://localhost:44303/api/Order';
    const itemUrl = 'https://localhost:44303/api/OrderDetail';
    const { order } = props;
    const [orderItems, setOrderItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(itemUrl);
            const data = response.data;
            const filter = data.filter((item) => item['orderId'] === order.id);
            setOrderItems(filter);
        };
        fetchData();
    }, []);

    return (
        <div className="order_container">
            <div className="order_header">
                <div>Yêu thích</div>
                <div>Tình trạng đơn hàng: {order.status ? 'Đã xác nhận' : 'Chờ xác nhận'}</div>
            </div>
            <div>
                {orderItems
                    ? orderItems.map((item, index) => (
                          <div className="order_item">
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
                        <button className="order_btn">MUA LẠI</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;

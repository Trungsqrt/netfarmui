import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/style.css';
import { useNavigate, Link } from 'react-router-dom';

const Order = (props) => {
    const orderUrl = 'https://localhost:44303/api/Order';
    const itemUrl = 'https://localhost:44303/api/OrderDetail';
    const { order } = props;
    const [orderItems, setOrderItems] = useState([]);
    const date = new Date(order.createAt).toLocaleDateString();
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const currentDate = new Date();

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.userId;
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(itemUrl);
            const data = response.data;
            const filter = data.filter((item) => item['orderId'] === order.id);
            setOrderItems(filter);
            if (order.cancel) {
                setText('Đã hủy');
            } else {
                {
                    order.status
                        ? order.delivery
                            ? order.finish
                                ? setText('Đã giao')
                                : setText('Đang giao hàng')
                            : setText('Đã xác nhận - Chờ giao hàng')
                        : setText('Chờ xác nhận');
                }
            }
        };
        fetchData();
    }, []);

    if (order.cancel || order.delivery) {
        const cancelbtn = document.getElementById(`cancel_btn${order.id}`);
        if (cancelbtn !== null) {
            cancelbtn.classList.add('hiden_btn');
        }
    }

    if (order.delivery && !order.finish) {
        const deliverybtn = document.getElementById(`finish_btn${order.id}`);
        if (deliverybtn !== null) {
            deliverybtn.classList.remove('hiden_btn');
        }
    }

    if (order.finish) {
        const rebuybtn = document.getElementById(`rebuy_btn${order.id}`);
        if (rebuybtn !== null) {
            rebuybtn.classList.remove('hiden_btn');
        }

        const feedbackbtn = document.getElementById(`feedback_btn${order.id}`);
        if (feedbackbtn !== null && (currentDate - new Date(order['finishAt'])) / 86400000 < 5) {
            feedbackbtn.classList.remove('hiden_btn');
        }
    }

    function CancelOrderHandler() {
        const orderDate = new Date(order.createAt);
        const currentDate = new Date();
        const gapDays = (currentDate - orderDate) / 86400000;
        if (order.delivery || gapDays > 5) alert('Bạn không thể hủy đơn hàng này');
        else {
            order.cancel = true;
            console.log(order);
            try {
                const putUrl = `${orderUrl}/${order.id}`;
                axios.put(putUrl, order);
                console.log(order);
            } catch (err) {
                alert('Có lỗi, xin vui lòng thử lại!');
            }
        }

        window.location.reload();
    }

    function FinishOrder() {
        order.finish = true;
        order.finishAt = new Date().toISOString();
        console.log(order);
        try {
            const putUrl = `${orderUrl}/${order.id}`;
            axios.put(putUrl, order);
            console.log(order);
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
        window.location.reload();
    }

    // function FeedbackOrder() {
    //     navigate(`/manage/Feedback/${order.id}`);
    // }
    const cartUrl = 'https://localhost:44303/api/Carts';

    const [carts, setCarts] = useState([]);
    function RebuyProduct() {
        const checkedList = [];
        for (var i = 0; i < orderItems.length; i++) {
            const id = orderItems[i].productId;
            checkedList.push(id);
            const postCart = {
                name: orderItems[i].productName,
                quantity: orderItems[i].quantity,
                price: orderItems[i].price,
                image: orderItems[i].image,
                userId: userId,
                productId: orderItems[i].productId,
            };
            const fetchData = async () => {
                const response = await axios.get(cartUrl);
                const data = response.data;
                const filter = data.filter((item) => item['userId'] === userId);
                const filter2 = filter.filter((item) => item['productId'] === id);
                setCarts(filter2);
                if (filter2.length === 0) {
                    AddNewProductToCart(postCart);
                } else {
                    const putCart = filter2[0];
                    putCart.quantity = filter2[0].quantity + postCart.quantity;
                    UpdateProductToCart(putCart);
                }
            };
            fetchData();
            localStorage.setItem('checked', checkedList);
            navigate('/shop/cart');
            window.location.reload();
        }

        function AddNewProductToCart(postCart) {
            try {
                axios.post(cartUrl, postCart);
            } catch (err) {
                alert('Có lỗi, xin vui lòng thử lại!');
            }
        }

        function UpdateProductToCart(cart) {
            try {
                axios.put(`${cartUrl}/${cart.id}`, cart);
            } catch (err) {
                alert('Có lỗi, xin vui lòng thử lại!');
            }
        }
    }
    return (
        <div className="order_container">
            <div className="order_header">
                <div>Yêu thích - {date}</div>
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
                        <button id={`cancel_btn${order.id}`} className="order_btn" onClick={CancelOrderHandler}>
                            Hủy đơn
                        </button>
                        <button id={`rebuy_btn${order.id}`} className="order_btn hiden_btn" onClick={RebuyProduct}>
                            Mua lại
                        </button>
                        <button id={`finish_btn${order.id}`} className="order_btn hiden_btn" onClick={FinishOrder}>
                            Xác nhận nhận hàng
                        </button>
                        <Link to={`/manage/Feedback/${order.id}`}>
                            <button id={`feedback_btn${order.id}`} className="order_btn hiden_btn" value={order.id}>
                                Đánh giá
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;

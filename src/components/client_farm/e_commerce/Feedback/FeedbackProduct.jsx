import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import '../css/style.css';
import _ from 'lodash';

const FeedbackProduct = () => {
    const { id } = useParams();
    const url = `https://localhost:44303/api/OrderDetail/${id}`;
    const feedbackUrl = 'http://127.0.0.1:8000/feedback/analyze/';
    const [product, setProduct] = useState({});
    const [star, setStar] = useState(5);
    const [text, setText] = useState('Tuyệt vời');
    const [content, setContent] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.userId;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url);
            const data = response.data;
            setProduct(data);
        };
        fetchData();
    }, [id]);

    const textChange = (star) => {
        switch (star) {
            case 1: {
                setText('Tệ');
                break;
            }
            case 2: {
                setText('Không hài lòng');
                break;
            }
            case 3: {
                setText('Bình thường');
                break;
            }
            case 4: {
                setText('Hài lòng');
                break;
            }
            case 5: {
                setText('Tuyệt vời');
                break;
            }
            default:
                setText('Tuyệt vời');
        }
    };

    const onChangeText = (e) => {
        const value = Math.max(1, Math.min(5, Number(e.target.value)));
        setStar(value);
        textChange(value);
    };

    // tăng lên 1 sao
    const upText = () => {
        const value = parseInt(star) + 1;
        if (value > 5) return;
        setStar(value);
        textChange(value);
    };

    //Giảm 1 sao
    const downText = () => {
        const value = parseInt(star) - 1;
        if (value === 0) return;
        setStar(value);
        textChange(value);
    };

    const handerFeedback = async () => {
        product.feedback = true;
        const postFeedback = {
            contents: content,
            star: star,
            productId: product.productId,
            userId: userId,
            sentiment: '',
            userName: '',
        };
        try {
            await axios.post(feedbackUrl, postFeedback);
            await axios.put(url, product);
            alert('Đăng thành công!');
            navigate('/manage/Feedback');
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    };
    return (
        <div className="container">
            <div className="feedback_wrapper">
                <div className="feedbackrow feedback_title">Đánh giá sản phẩm</div>
                <div className="feedbackrow feedback_product">
                    <img className="feedback_product_img" src={product.image}></img>
                    <div className="feedback_product_content">
                        <div className="feedback_product_name">{product.productName}</div>
                        <div className="feedback_product_quantity">Giá bán: {product.price}</div>
                        <div className="feedback_product_quantity">x {product.quantity}</div>
                    </div>
                    <div className="feedback_product_price">{product.price}Đ</div>
                </div>
                <div className="feedbackrow feedback_star">
                    <span className="feedback_text">Chất lượng sản phẩm</span>
                    <div className="list-inline list-star">
                        <div className="star_quantity">
                            <button className="dec-btn p-0" style={{ cursor: 'pointer' }} onClick={downText}>
                                <i className="fas fa-caret-left"></i>
                            </button>
                            <input className="" type="number" min="1" max="5" value={star} onChange={onChangeText} />
                            <button className="inc-btn p-0" style={{ cursor: 'pointer' }} onClick={upText}>
                                <i className="fas fa-caret-right"></i>
                            </button>
                        </div>
                        <ul className="star">
                            {_.times(star, (i) => (
                                <li className="list-inline-start-big" key={i}>
                                    <i className="fas fa-star small text-warning"></i>
                                </li>
                            ))}
                        </ul>
                        <div className="star_text">{text}</div>
                    </div>
                </div>
                <div className="feedbackrow">
                    <div className="feedback_content">
                        <textarea
                            name="content"
                            id=""
                            cols="50"
                            rows="10"
                            className="feedback_content"
                            placeholder="Hãy chia sẽ những điều bạn thích về sản phẩm này cho những người mua khác nhé"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <div className=" btn_right">
                    <Link to={`/manage/Feedback/${product.orderId}`}>
                        <button className="btn_white">Trở lại</button>
                    </Link>
                    <button className="btn" onClick={handerFeedback}>
                        Hoàn thành
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackProduct;

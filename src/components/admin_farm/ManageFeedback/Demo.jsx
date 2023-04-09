import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Radio.css';
import _ from 'lodash';

const Demo = () => {
    // const data = {
    //     feedback: {
    //         contents: 'Sp tốt giá rẻ chất lượng cao 10₫ Nên mua nha mọi người👍😁😁😁😁😁',
    //         star: 5,
    //         productId: 6,
    //         userId: 1020,
    //         sentiment: 'Positive',
    //         userName: '',
    //     },
    //     predictions: [[0.00173, 0.99291, 0.00534]],
    //     preprocessedText: 'sản_phẩm tốt giá rẻ chất_lượng cao 10 nên mua nha mọi người',
    // };
    const productUrl = 'https://localhost:44303/api/Products';
    const postUrl = 'http://127.0.0.1:8000/feedback/analyze/';
    const [productList, setProductList] = useState([]);
    const [product, setProduct] = useState('all');
    const [star, setStar] = useState(5);
    const [text, setText] = useState('Tuyệt vời');
    const [data, setData] = useState({
        feedback: {
            contents: '',
            star: 0,
            productId: 0,
            userId: 0,
            sentiment: '',
            userName: '',
        },
        predictions: [[0, 0, 0]],
        preprocessedText: '',
    });
    const [content, setContent] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.userId;
    useEffect(() => {
        const fetchData = async () => {
            const productResponse = await axios.get(productUrl);
            setProductList(productResponse.data);
        };
        fetchData();
    }, []);

    const productSelected = async (e) => {
        setProduct(e.target.value);
    };
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
                setText('Quá tệ');
        }
    };
    const onChangeText = (e) => {
        const value = Math.max(0, Math.min(5, Number(e.target.value)));
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
        if (value === -1) return;
        setStar(value);
        textChange(value);
    };

    const senHandler = async () => {
        if (product === 'all') {
            alert('Bạn phải chọn sản phẩm');
            return;
        }
        const fb = {
            contents: content,
            userId: userId,
            productId: product,
            star: star,
            sentiment: '',
            userName: '',
        };
        const fb_respone = await axios.post(postUrl, fb);
        // console.log(fb_respone);
        setData(fb_respone.data);
    };
    return (
        <div className="Demo_container">
            <div className="Demo_header">Phân tích sắc thái phản hồi của người tiêu dùng</div>
            <div className="Demo_request">
                <div className="display_flex">
                    <div className="demo_title">Chọn sản phẩm :</div>
                    <select name="product" id="product" value={product} onChange={productSelected}>
                        <option disabled value="all">
                            Chọn sản phẩm
                        </option>{' '}
                        {productList
                            ? productList.map((product, index) => (
                                  <option value={product.id} key={index}>
                                      {product.name}
                                  </option>
                              ))
                            : ''}
                    </select>
                </div>
                <div className="display_flex Demo_request demo_star">
                    <span className="demo_title">Chất lượng sản phẩm</span>
                    <div className="demo_list_star">
                        <div className="demo_star_quantity">
                            <button className="dec-btn p-0" style={{ cursor: 'pointer' }} onClick={downText}>
                                <i className="fas fa-caret-left"></i>
                            </button>
                            <input className="" type="number" min="1" max="5" value={star} onChange={onChangeText} />
                            <button className="inc-btn p-0" style={{ cursor: 'pointer' }} onClick={upText}>
                                <i className="fas fa-caret-right"></i>
                            </button>
                        </div>
                        <ul className="starline_demo">
                            {_.times(star, (i) => (
                                <li className="li_star" key={i}>
                                    <i className="fas fa-star small text-warning"></i>
                                </li>
                            ))}
                        </ul>
                        <div className="star_text">{text}</div>
                    </div>
                </div>
                <div className="">
                    <div className="demo_title"> Nhập phản hồi: </div>
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
                <div className="demo_btn">
                    <button onClick={senHandler} className="compete_btn">
                        Phản hồi
                    </button>
                </div>
            </div>
            <div className="Demo_respone">
                <div className="demo_title_respone">
                    <h6 className="demo_title"> Dữ liệu đầu vào:</h6>
                    <div className="demo_respone_data rext_respone">{data.feedback.contents}</div>
                </div>
                <div className="demo_title_respone">
                    <h6 className="demo_title">Dữ liệu sau khi tiền xử lý:</h6>
                    <div className="demo_respone_data rext_respone">{data.preprocessedText}</div>
                </div>
                <div className="display_flex sentiment_respone">
                    <div className="demo_title_respone display_flex">
                        <h6 className="sentiment_title">Tích cực:</h6>
                        <div className="demo_respone_data">{data.predictions[0][0]}</div>
                    </div>
                    <div className="demo_title_respone display_flex">
                        <h6 className="sentiment_title">Tiêu cực: </h6>
                        <div className="demo_respone_data">{data.predictions[0][1]}</div>
                    </div>
                    <div className="demo_title_respone display_flex">
                        <h6 className="sentiment_title">Trung tính: </h6>
                        <div className="demo_respone_data">{data.predictions[0][2]}</div>
                    </div>
                </div>
            </div>
            <div className="demo_title_respone display_flex">
                <h6 className="demo_sentiment_title">Kết quả: </h6>
                <div className="demo_respone_data">{data.feedback.sentiment}</div>
            </div>
        </div>
    );
};

export default Demo;

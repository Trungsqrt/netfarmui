import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import productAPI from '../../../../../apis/productAPI';
import Product from './Product';
import Header from '../../../share/header/Header';
import axios from 'axios';
import _ from 'lodash';

function ProductDetail(props) {
    //id params cho từng sản phẩm
    const { id } = useParams();

    // phần này dể lấy feedback
    const feedbackUrl = 'https://localhost:44303/api/Feedbacks';
    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(feedbackUrl);
            const filter = response.data.filter((item) => item['productId'] === Number(id));
            setFeedbacks(filter);
            console.log(filter);
        };
        fetchData();
    }, []);
    const [detail, setDetail] = useState();

    //Phần này là để thay đổi số lượng khi mua sản phẩm
    const [text, setText] = useState(1);
    const onChangeText = (e) => {
        const value = Math.max(1, Math.min(Number(detail.inventoryNumber), Number(e.target.value)));
        setText(value);
    };

    // tăng lên 1 đơn vị
    const upText = () => {
        const value = parseInt(text) + 1;
        if (value > Number(detail.inventoryNumber)) return;
        setText(value);
    };

    //Giảm 1 đơn vị
    const downText = () => {
        const value = parseInt(text) - 1;
        if (value === 0) return;
        setText(value);
    };

    //Hàm này để lấy dữ liệu chi tiết sản phẩm
    useEffect(() => {
        const fetchData = async () => {
            const response = await productAPI.getDetail(id);
            setDetail(response.data);

            if (response.data.inventoryNumber === 0) {
                const btns = document.getElementById(`btnAdd`);
                if (btns !== null) {
                    btns.classList.add('hiden_btn');
                }

                const soldOuttext = document.getElementById('soldOut');
                if (soldOuttext !== null) {
                    soldOuttext.classList.remove('hiden_btn');
                }
            }
        };
        fetchData();
    }, [id]);

    // phần này để thêm sản phẩm vào giỏ hàng
    const cartUrl = 'https://localhost:44303/api/Carts';
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [carts, setCarts] = useState([]);

    // tìm trong giỏi hàng đã có sản phẩm này hay chưa
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(cartUrl);
            const data = response.data;
            if (user) {
                const userId = user.userId;
                const filter = data.filter((item) => item['userId'] === userId);
                const filter2 = filter.filter((item) => item['productId'] === Number(id));
                setCarts(filter2);
                console.log('carts', filter2);
            }
        };
        fetchData();
    }, []);

    function AddToCartHandler() {
        if (user == null) navigate('/login');
        else {
            const userId = user.userId;
            if (carts.length !== 0) {
                UpdateProductToCart(userId, carts[0]);
            } else {
                // thêm mới sản phẩm nếu giỏ hàng chưa có
                AddNewProductToCart(userId);
            }
            window.location.reload();
        }
    }
    // Phần này để thêm sản phẩm mới hoàn toàn vào giỏ hàng
    function AddNewProductToCart(userId) {
        const newCart = {
            userId: userId,
            productId: detail.id,
            name: detail.name,
            quantity: text,
            price: detail.price,
            image: detail.image1,
        };
        console.log('newcarts', newCart);
        try {
            axios.post(cartUrl, newCart);
            alert('Thêm vào giỏi hàng thành công!');
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    }

    function UpdateProductToCart(userId, cart) {
        cart.quantity = Number(cart.quantity) + Number(text);
        try {
            axios.put(`${cartUrl}/${cart.id}`, cart);
            alert('Cập nhập lại số lượng');
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    }

    //Hàm này gọi API và cắt chỉ lấy 3 sản phẩm
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await productAPI.getAPI();

            const data = response.data.splice(0, 4);
            setProducts(data);
        };

        fetchData();
    }, []);

    function BuyNowHandler() {
        // if (user == null) navigate('/login');
        // else {
        //     const userId = user.userId;
        //     const newCart = {
        //         userId: userId,
        //         productId: detail.id,
        //         name: detail.name,
        //         quantity: text,
        //         price: detail.price,
        //         image: detail.image1,
        //     };
        //     console.log('newcarts', newCart);
        //     try {
        //         axios.post(cartUrl, newCart);
        //     } catch (err) {
        //         alert('Có lỗi, xin vui lòng thử lại!');
        //     }
        //     navigate('/shop/cart');
        //     window.location.reload();
        // }
        const checkedList = [];
        checkedList.push(detail.id);
        console.log(checkedList);
        localStorage.removeItem('checked');
        localStorage.setItem('checked', checkedList);
        AddToCartHandler();
        navigate('/shop/cart');
        window.location.reload();
    }

    return (
        <div>
            <Header></Header>
            <div className="productDetail_wrapper">
                {detail && (
                    <div className="detail_wrapper" key={id}>
                        <div className="section_title">Thông tin sản phẩm</div>
                        <div className="product_detail">
                            <div className="product_detail_img">
                                <div className="product_detail_img_4">
                                    <img className="img_sm" src={detail.image1}></img>
                                    <img className="img_sm" src={detail.image2}></img>
                                    <img className="img_sm" src={detail.image3}></img>
                                    <img className="img_sm" src={detail.image4}></img>
                                </div>
                                <div className="product_detail_img_1">
                                    <img className="img_lg" src={detail.image1}></img>
                                </div>
                            </div>
                            <div className="product_detail_content">
                                <ul className="list-inline mb-2">
                                    <li className="list-inline-item m-0">
                                        <i className="fas fa-star small text-warning"></i>
                                    </li>
                                    <li className="list-inline-item m-0">
                                        <i className="fas fa-star small text-warning"></i>
                                    </li>
                                    <li className="list-inline-item m-0">
                                        <i className="fas fa-star small text-warning"></i>
                                    </li>
                                    <li className="list-inline-item m-0">
                                        <i className="fas fa-star small text-warning"></i>
                                    </li>
                                    <li className="list-inline-item m-0">
                                        <i className="fas fa-star small text-warning"></i>
                                    </li>
                                </ul>
                                <h1 className="product_detail_name">{detail.name}</h1>
                                <div className="product_detail_price">{detail.price} đ</div>
                                <div className="product_detail_description">{detail.description} </div>
                                <div className="product_detail_description">Nơi sản xuất: {detail.placeProduce} </div>
                                <div className="product_detail_description">Đơn vị tính: {detail.unit} </div>
                                <div className="product_detail_description">
                                    Số lượng hàng có sẵn: {detail.inventoryNumber}{' '}
                                </div>
                                <div className="quantity_row">
                                    <span className="quantity_text">Số lượng</span>
                                    <div className="quantity">
                                        <button
                                            className="dec-btn p-0"
                                            style={{ cursor: 'pointer' }}
                                            onClick={downText}
                                        >
                                            <i className="fas fa-caret-left"></i>
                                        </button>
                                        <input
                                            className=""
                                            type="number"
                                            min="1"
                                            max="5"
                                            value={text}
                                            onChange={onChangeText}
                                        />
                                        <button className="inc-btn p-0" style={{ cursor: 'pointer' }} onClick={upText}>
                                            <i className="fas fa-caret-right"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="" id="btnAdd">
                                    <button className="Detail_Add_btn" onClick={AddToCartHandler}>
                                        Thêm vào giỏ hàng
                                    </button>
                                    <button className="Detail_Add_btn" onClick={BuyNowHandler}>
                                        Mua ngay
                                    </button>
                                </div>
                                <div className="soldOut hiden_btn" id="soldOut">
                                    Sản phẩm này hiện đang hết hàng!
                                </div>
                                <div className="addtional_infor">
                                    <div className="category_infor">Category: {detail.category}</div>
                                    <div className="category_infor">Tag: nongnghiep</div>
                                </div>
                            </div>
                        </div>
                        <div className="review_feedback">
                            <div className="section_title">Phản hồi của khách hàng</div>
                            {feedbacks
                                ? feedbacks.map((feedback, index) => (
                                      <div className="feedback_row" key={index}>
                                          <div className="feedback_detail">
                                              <div className="feedback_detail_header">
                                                  <div className="feedback_user">{feedback.userName}</div>
                                                  <div className="feedback_start">
                                                      <ul className="list-inline mb-2">
                                                          {_.times(feedback.star, (i) => (
                                                              <li className="list-inline-item m-0 " key={i}>
                                                                  <i className="fas fa-star small text-warning"></i>
                                                              </li>
                                                          ))}
                                                      </ul>
                                                  </div>
                                              </div>
                                              <div className="feedback_content">{feedback.contents}</div>
                                          </div>
                                      </div>
                                  ))
                                : ''}
                        </div>
                        <div className="related_product">
                            <div className="section_title">Có thể bạn quan tâm</div>
                            <div className="product_related_row">
                                <div className="list_product">
                                    {products
                                        ? products.map((item, index) => (
                                              <Product
                                                  product={item}
                                                  key={item.id}
                                                  update={item.id}
                                                  number={index}
                                              ></Product>
                                          ))
                                        : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;

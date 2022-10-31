import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import productAPI from '../../../../../apis/productAPI';
import Product from './Product';
import Header from '../../../share/header/Header';
import axios from 'axios';

function ProductDetail(props) {
    const [detail, setDetail] = useState();

    //id params cho từng sản phẩm
    const { id } = useParams();

    //Phần này là để thay đổi số lượng khi mua sản phẩm
    const [text, setText] = useState(1);
    const onChangeText = (e) => {
        setText(e.target.value);
    };

    // tăng lên 1 đơn vị
    const upText = () => {
        const value = parseInt(text) + 1;
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
        };
        fetchData();
    }, [id]);

    // phần này để thêm sản phẩm vào giỏ hàng
    const cartUrl = 'https://localhost:44303/api/Carts';
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [carts, setCarts] = useState([]);
    const [checkList, setCheckList] = useState([]);

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
            window.location.reload();
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    }

    function UpdateProductToCart(userId, cart) {
        cart.quantity = Number(cart.quantity) + Number(text);
        try {
            axios.put(`${cartUrl}/${cart.id}`, cart);
            alert('Cập nhập lại số lượng');
            window.location.reload();
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    }

    //Hàm này gọi API và cắt chỉ lấy 3 sản phẩm
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await productAPI.getAPI();

            const data = response.data.splice(0, 3);
            setProducts(data);
        };

        fetchData();
    }, []);

    function BuyNowHandler() {
        if (user == null) navigate('/login');
        else {
            const userId = user.userId;
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
            } catch (err) {
                alert('Có lỗi, xin vui lòng thử lại!');
            }
            navigate('/shop/cart');
            window.location.reload();
        }
    }

    return (
        <div>
            <Header></Header>
            <div className="productDetail_wrapper">
                {detail && (
                    <div className="detail_wrapper">
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
                                <div className="quantity_row">
                                    <span className="quantity_text">Số lượng</span>
                                    <div className="quantity">
                                        <button className="dec-btn p-0" style={{ cursor: 'pointer' }}>
                                            <i className="fas fa-caret-left" onClick={downText}></i>
                                        </button>
                                        <input className="" type="text" value={text} onChange={onChangeText} />
                                        <button className="inc-btn p-0" style={{ cursor: 'pointer' }}>
                                            <i className="fas fa-caret-right" onClick={upText}></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="btn">
                                    <button className="Detail_Add_btn" onClick={AddToCartHandler}>
                                        Thêm vào giỏ hàng
                                    </button>
                                    <button className="Detail_Add_btn" onClick={BuyNowHandler}>
                                        Mua ngay
                                    </button>
                                </div>
                                <div className="addtional_infor">
                                    <div className="category_infor">Category: {detail.category}</div>
                                    <div className="category_infor">Tag: nongnghiep</div>
                                </div>
                            </div>
                        </div>
                        <div className="review_feedback">
                            <div className="section_title">Phản hồi của khách hàng</div>
                            <div className="feedback_row">
                                <div className="feedback_detail">
                                    <div className="feedback_detail_header">
                                        <div className="feedback_user">ABC</div>
                                        <div className="feedback_start">
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
                                        </div>
                                    </div>
                                    <div className="feedback_content">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem error
                                        dignissimos nesciunt veritatis dolore iste, porro ex cupiditate officia unde ut
                                        dolor odit? Nemo molestiae maiores, voluptates ratione odio quibusdam!
                                    </div>
                                </div>
                            </div>
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

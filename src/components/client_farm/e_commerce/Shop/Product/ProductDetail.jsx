import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import productAPI from '../../../../../apis/productAPI';
import Product from './Product';
function ProductDetail(props) {
    const [detail, setDetail] = useState({});

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
            console.log(response.data);
            setDetail(response.data);
        };
        fetchData();
    }, [id]);

    //Hàm này gọi API và cắt chỉ lấy 4 sản phẩm
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await productAPI.getAPI();

            const data = response.data.splice(0, 3);
            console.log('test', data);
            setProducts(data);
        };

        fetchData();
    }, []);

    return (
        <div className="productDetail_wrapper">
            {detail && (
                <div className="detail_wrapper">
                    <div className="product_detail">
                        <div className="product_detail_img">
                            <div className="product_detail_img_4">
                                <img className="img_sm" src={detail.img1}></img>
                                <img className="img_sm" src={detail.img2}></img>
                                <img className="img_sm" src={detail.img3}></img>
                                <img className="img_sm" src={detail.img4}></img>
                            </div>
                            <div className="product_detail_img_1">
                                <img className="img_lg" src={detail.img1}></img>
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
                            <div className="quantiry_row">
                                <span className="small_text">Số lượng</span>
                                <div className="quantity">
                                    <button className="dec-btn p-0" style={{ cursor: 'pointer' }}>
                                        <i className="fas fa-caret-left" onClick={downText}></i>
                                    </button>
                                    <input
                                        className="form-control border-0 shadow-0 p-0"
                                        type="text"
                                        value={text}
                                        onChange={onChangeText}
                                    />
                                    <button className="inc-btn p-0" style={{ cursor: 'pointer' }}>
                                        <i className="fas fa-caret-right" onClick={upText}></i>
                                    </button>
                                </div>
                            </div>
                            <div className="btn">
                                <button className="Detail_Add_btn">Thêm vào giỏ hàng</button>
                                <button className="Detail_Add_btn">Mua ngay</button>
                            </div>
                            <div className="addtional_infor">
                                <div className="category_infor">Category: {detail.category}</div>
                                <div className="category_infor">Tag: nongnghiep</div>
                            </div>
                        </div>
                    </div>
                    <div className="related_product">
                        Có thể bạn quan tâm
                        <div className="product_row">
                            <div>
                                <div class="list_product">
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
                </div>
            )}
        </div>
    );
}

export default ProductDetail;

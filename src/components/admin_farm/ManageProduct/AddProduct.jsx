import React from 'react';
import Header from '../share/header/Header';
import '../css/style.css';
const AddProduct = () => {
    return (
        <div>
            <Header></Header>
            <div className="addProduct_container">
                <div className="addProduct_title">Nhập thông tin sản phẩm</div>
                <ul className="addProduct_list">
                    <li className="addProduct_row">
                        <div className="product_properties">Tên sản phẩm</div>
                        <input className="product_input" type={Text}></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Danh mục</div>
                        <input className="product_input" type={Text}></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Giá</div>
                        <input className="product_input" type={Number}></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Link ảnh 1</div>
                        <input className="product_input" type={Text}></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Link ảnh 2</div>
                        <input className="product_input" type={URL}></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Link ảnh 3</div>
                        <input className="product_input" type={URL}></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Link ảnh 4</div>
                        <input className="product_input" type={URL}></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Mô tả</div>
                        <input className="product_input" type={toString}></input>
                    </li>
                </ul>
                <button className="addProduct_btn">Thêm mới</button>
            </div>
        </div>
    );
};

export default AddProduct;

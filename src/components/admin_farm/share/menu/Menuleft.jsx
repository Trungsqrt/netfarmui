import React from 'react';
import logoAdmin from '../../../../assets/image/logo-admin.jpg';
import './menu.css';
const Menuleft = () => {
    return (
        <div>
            <div className="container-left">
                <ul className="menu-list">
                    <li className="menu-item"><a href="#">CHUNG</a></li>
                    <li className="menu-item"><a href="#">QUẢN LÝ NGƯỜI DÙNG</a></li>
                    <li className="menu-item"><a href="#">QUẢN LÝ BÀI ĐĂNG</a></li>
                    <li className="menu-item"><a href="#">QUẢN LÝ SẢN PHẨM</a></li>
                    <li className="menu-item"><a href="#">QUẢN LÝ DANH MỤC HÀNG</a></li>
                    <li className="menu-item"><a href="#">QUẢN LÝ ĐƠN HÀNG</a></li>
                    <li className="menu-item"><a href="#">THỐNG KÊ</a></li>
                    <li className="menu-item"><a href="#">QUẢN LÝ THÔNG TIN</a></li>
                </ul>
                <img className="logo-admin" src={logoAdmin} alt="admin"></img>
            </div>
        </div>
    );
};

export default Menuleft;

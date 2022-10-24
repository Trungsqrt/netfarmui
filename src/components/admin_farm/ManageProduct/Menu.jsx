import React from 'react';
import '../css/style.css';
const Menu = () => {
    return (
        <div className="MenuProduct">
            <div className="manageProduct_container">
                <ul className="menulist">
                    <li className="MenuItem">
                        <a href="" className="menu_link">
                            MẶT HÀNG
                        </a>
                    </li>
                    <li className="MenuItem">
                        <a href="" className="menu_link">
                            DANH MỤC
                        </a>
                    </li>
                    <li className="MenuItem">
                        <a href="" className="menu_link">
                            ĐƠN HÀNG
                        </a>
                    </li>
                    <li className="MenuItem">
                        <a href="" className="menu_link">
                            THỐNG KÊ
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Menu;

import React from 'react';
import './menu.css';
import { Link } from 'react-router-dom';
const Menuleft = () => {
    return (
        <div>
            <div className="min-width-menu">
                <ul className="menulist">
                    <li className="MenuItem">
                        <Link to="/inforPage" className="menu_link">
                            CHUNG
                        </Link>
                    </li>
                    <li className="MenuItem">
                        <Link to="/inforPage/schedule" className="menu_link">
                            LỊCH NÔNG VỤ
                        </Link>
                    </li>
                    <li className="MenuItem">
                        <Link to="/inforPage/news" className="menu_link">
                            TIN TỨC
                        </Link>
                    </li>
                    <li className="MenuItem">
                        <Link to="/inforPage/manual" className="menu_link">
                            HƯỚNG DẪN
                        </Link>
                    </li>
                    <li className="MenuItem">
                        <Link to="/inforPage/policy" className="menu_link">
                            CHÍNH SÁCH
                        </Link>
                    </li>
                    <li className="MenuItem">
                        <Link to="/inforPage/DSS" className="menu_link">
                            TƯ VẤN
                        </Link>
                    </li>
                </ul>
                <img className="menulist_img" src="https://ttpcert.com.vn/wp-content/uploads/2021/01/Doc1.jpg"></img>
            </div>
        </div>
    );
};

export default Menuleft;

import React from 'react';
import './menu.css';
const Menuleft = () => {
    return (
        <div>
            <div>
                <ul className="menulist">
                    <li className="MenuItem">
                        <a href="/inforPage" className="menu_link">
                            CHUNG
                        </a>
                    </li>
                    <li className="MenuItem">
                        <a href="/inforPage/schedule" className="menu_link">
                            LỊCH NÔNG VỤ
                        </a>
                    </li>
                    <li className="MenuItem">
                        <a href="/inforPage/news" className="menu_link">
                            TIN TỨC
                        </a>
                    </li>
                    <li className="MenuItem">
                        <a href="/inforPage/manual" className="menu_link">
                            HƯỚNG DẪN
                        </a>
                    </li>
                    <li className="MenuItem">
                        <a href="/inforPage/policy" className="menu_link">
                            CHÍNH SÁCH
                        </a>
                    </li>
                    <li className="MenuItem">
                        <a href="/inforPage/DSS" className="menu_link">
                            TƯ VẤN
                        </a>
                    </li>
                </ul>
                <img className="menulist_img" src="https://ttpcert.com.vn/wp-content/uploads/2021/01/Doc1.jpg"></img>
            </div>
        </div>
    );
};

export default Menuleft;

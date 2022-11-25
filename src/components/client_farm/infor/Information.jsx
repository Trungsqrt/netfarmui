import React, { useEffect, useState } from 'react';
import { default as StaffHeader } from '../share/header/Header';
import { default as FarmerHeader } from '../../client_farm/share/header/Header';
import General from './general/General';
import Schedule from './schedule/Schedule';
import News from './news/News';
import Policy from './policy/Policy';
import Manual from './manual/Manual';
import Footer from '../share/footer/Footer';
import DSS from '../../client_farm/infor/dss/DSS';
import './InforPage.css';
import './css/style1.css';
const Information = () => {
    // lấy dữ liệu toàn bộ các bài đăng
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const [render, setRender] = useState(0);
    const [user, setUser] = useState('');
    if (currentUser) {
        setUser(currentUser.roleName);
    }
    return (
        <div>
            <div>
                {(user === 'Admin' || user === 'Expert') && <StaffHeader />}
                {!(user === 'Admin' || user === 'Expert') && <FarmerHeader />}
                <div className="infor_main">
                    <div className="menu">
                        <div className="menu_header">NETFARM</div>
                        <ul className="infor_menulist">
                            <li
                                className={render === 0 ? 'infor_MenuItem_active' : 'infor_MenuItem'}
                                onClick={() => setRender(0)}
                            >
                                <div className="infor_menu_link">CHUNG</div>
                            </li>
                            <li
                                className={render === 1 ? 'infor_MenuItem_active' : 'infor_MenuItem'}
                                onClick={() => setRender(1)}
                            >
                                <div className="infor_menu_link">LỊCH NÔNG VỤ</div>
                            </li>
                            <li
                                className={render === 2 ? 'infor_MenuItem_active' : 'infor_MenuItem'}
                                onClick={() => setRender(2)}
                            >
                                <div className="infor_menu_link">TIN TỨC</div>
                            </li>
                            <li
                                className={render === 3 ? 'infor_MenuItem_active' : 'infor_MenuItem'}
                                onClick={() => setRender(3)}
                            >
                                <div className="infor_menu_link">HƯỚNG DẪN</div>
                            </li>
                            <li
                                className={render === 4 ? 'infor_MenuItem_active' : 'infor_MenuItem'}
                                onClick={() => setRender(4)}
                            >
                                <div className="infor_menu_link">CHÍNH SÁCH</div>
                            </li>
                            <li
                                className={render === 5 ? 'infor_MenuItem_active' : 'infor_MenuItem'}
                                onClick={() => setRender(5)}
                            >
                                <div className="menu_link">TƯ VẤN</div>
                            </li>
                        </ul>
                        <img className="menulist_img" style={{ objectFit: 'cover' }} src="https://bom.so/0nAKIP"></img>
                    </div>

                    <div className="infor_container">
                        {render === 0 && <General></General>}
                        {render === 1 && <Schedule></Schedule>}
                        {render === 2 && <News></News>}
                        {render === 3 && <Manual></Manual>}
                        {render === 4 && <Policy></Policy>}
                        {render === 5 && <DSS></DSS>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Information;

import { Col, Layout, Menu, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import DSS from '../../client_farm/infor/DSS/DSS';
import NewHeader from '../share/newheader/NewHeader';
import './InforPage.css';
import './css/style1.css';
import General from './general/General';
import Manual from './manual/Manual';
import News from './news/News';
import Policy from './policy/Policy';
import Schedule from './schedule/Schedule';
import Sider from 'antd/es/layout/Sider';
const Information = () => {
    // lấy dữ liệu toàn bộ các bài đăng
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const [render, setRender] = useState(0);
    const [user, setUser] = useState('');
    useEffect(() => {
        if (currentUser) setUser(currentUser.roleName);
    }, []);

    const changeTag =(e) => {
        console.log("🚀 ~ file: Information.jsx:26 ~ changeTag ~ e:", e.key)
        setRender(e.key);
    }
    return (
        // <div>
        //     <div>
        //         {/* {user === 'Admin' || user === 'Expert' ? <StaffHeader /> : <FarmerHeader />} */}
        //         {/* {!(user === 'Admin' || user === 'Expert') && <FarmerHeader />} */}
        //         <Layout style={{ display: 'block', marginBottom: '150px' }}>
        //             <NewHeader></NewHeader>
        //         </Layout>
        //         <div className="infor_main">
        //             <div className="menu">
        //                 <div className="menu_header">NETFARM</div>
        //                 <ul style={{display:'block'}}>
        //                     <li
        //                         className={render === 0 ? 'infor_MenuItem_active' : 'infor_MenuItem'}
        //                         onClick={() => setRender(0)}
        //                     >
        //                         CHUNG
        //                     </li>
        //                     <li
        //                         className={render === 1 ? 'infor_MenuItem_active' : 'infor_MenuItem'}
        //                         onClick={() => setRender(1)}
        //                     >
        //                         LỊCH NÔNG VỤ
        //                     </li>
        //                     <li
        //                         className={render === 2 ? 'infor_MenuItem_active' : 'infor_MenuItem'}
        //                         onClick={() => setRender(2)}
        //                     >
        //                         TIN TỨC
        //                     </li>
        //                     <li
        //                         className={render === 3 ? 'infor_MenuItem_active' : 'infor_MenuItem'}
        //                         onClick={() => setRender(3)}
        //                     >
        //                         HƯỚNG DẪN
        //                     </li>
        //                     <li
        //                         className={render === 4 ? 'infor_MenuItem_active' : 'infor_MenuItem'}
        //                         onClick={() => setRender(4)}
        //                     >
        //                         CHÍNH SÁCH
        //                     </li>
        //                     {user === 'Farmer' && (
        //                         <li
        //                             className={render === 5 ? 'infor_MenuItem_active' : 'infor_MenuItem'}
        //                             onClick={() => setRender(5)}
        //                         >
        //                             TƯ VẤN
        //                         </li>
        //                     )}
        //                 </ul>
        //                 <img
        //                     className="menulist_img"
        //                     style={{ objectFit: 'cover' }}
        //                     src="https://ttpcert.com.vn/wp-content/uploads/2021/01/Doc1.jpg"
        //                 ></img>
        //             </div>

        //             <div className="infor_container">
        //                 {render === 0 && <General></General>}
        //                 {render === 1 && <Schedule></Schedule>}
        //                 {render === 2 && <News></News>}
        //                 {render === 3 && <Manual></Manual>}
        //                 {render === 4 && <Policy></Policy>}
        //                 {render === 5 && <DSS></DSS>}
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <Layout>
            <Layout style={{ display: 'block', marginBottom: '150px' }}>
                <NewHeader></NewHeader>
            </Layout>
            <Layout style={{ paddingBottom: '40px' }}>
                <Row>
                    <Col span={4} offset={1}>
                        <Layout style={{ background: 'rgb(225, 216, 40)', height: '100%' }}>
                        <div className="menu_header">NETFARM</div>
                            <Menu
                                // theme="dark"
                                mode="vertical"
                                style={{ display: 'block',padding:'5px',border:'none',textAlign:'center' }}
                                defaultSelectedKeys={['0']}
                                onClick={changeTag}
                                items={[
                                    {
                                        key: '0',
                                        label: 'CHUNG',
                                    },
                                    {
                                        key: '1',
                                        label: 'LỊCH NÔNG VỤ',
                                    },
                                    {
                                        key: '2',
                                        label: 'TIN TỨC',
                                    },
                                    {
                                        key: '3',
                                        label: 'HƯỚNG DẪN',
                                    },
                                    {
                                        key: '4',
                                        label: 'CHÍNH SÁCH',
                                    },
                                    {
                                        key: '5',
                                        label: 'TƯ VẤN',
                                    },
                                ]}
                            />
                            <img
                                className="menulist_img"
                                style={{ objectFit: 'cover' }}
                                src="https://ttpcert.com.vn/wp-content/uploads/2021/01/Doc1.jpg"
                            ></img>
                        </Layout>
                    </Col>
                    <Col span={18} >
                        <div className="infor_container">
                            {render == 0 && <General></General>}
                            {render == 1 && <Schedule></Schedule>}
                            {render == 2 && <News></News>}
                            {render == 3 && <Manual></Manual>}
                            {render == 4 && <Policy></Policy>}
                            {render == 5 && <DSS></DSS>}
                        </div>
                    </Col>
                </Row>
            </Layout>
        </Layout>
    );
};

export default Information;

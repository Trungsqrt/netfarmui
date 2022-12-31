import React, { useEffect, useState, useMemo } from 'react';
import '../css/style.css';
import Header from '../share/header/Header';
import styled from 'styled-components';
import {
    AiOutlineAppstore,
    AiFillCodeSandboxCircle,
    AiOutlineShoppingCart,
    AiOutlineUsergroupAdd,
    AiOutlineShopping,
    AiOutlineMessage,
    AiOutlinePieChart,
    AiOutlineSetting,
} from 'react-icons/ai';
import Dashboard from './ManageStatistical/Dashboard';
import ManageCategory from './ManageCategory/ManageCategory';
import ManageOrder from './ManageOrder/ManageOrder';
import Manage from './ManageProduct/Manage';
import SaleReport from './ManageReport/SaleReport';
const ManageProduct = () => {
    const [render, setRender] = useState(1);

    const currentTab = Number(localStorage.getItem('currentTab'));
    useEffect(() => {
        if (currentTab) {
            setRender(currentTab);
        }
    }, []);

    const ProductHandler = () => {
        setRender(1);
        localStorage.setItem('currentTab', 1);
    };

    // Phần này lấy dữ liệu cho category
    const CategoryHandler = () => {
        setRender(2);
        localStorage.setItem('currentTab', 2);
    };

    // Phần này lấy dữ liệu cho order
    const OrderHandler = () => {
        setRender(3);
        localStorage.setItem('currentTab', 3);
    };

    const DashboardHandler = () => {
        setRender(4);
        localStorage.setItem('currentTab', 4);
    };

    const ReportHandler = () => {
        setRender(5);
        localStorage.setItem('currentTab', 5);
    };

    return (
        <div>
            <Header></Header>
            <div className="manageContainer">
                {/* <div className="MenuProduct">
                    <div className="manageProduct_container">
                        <ul className="menulist">
                            <li className="MenuItem" onClick={ProductHandler}>
                                <p className="menu_link">MẶT HÀNG</p>
                            </li>
                            <li className="MenuItem" onClick={CategoryHandler}>
                                <p className="menu_link">DANH MỤC</p>
                            </li>
                            <li className="MenuItem" onClick={OrderHandler}>
                                <p className="menu_link">ĐƠN HÀNG</p>
                            </li>
                            <li className="MenuItem">
                                <p href="" className="menu_link">
                                    THỐNG KÊ
                                </p>
                            </li>
                        </ul>
                    </div>
                </div> */}
                <div className="MenuProduct">
                    <Section>
                        <div className="top">
                            <div className="brand">
                                <AiFillCodeSandboxCircle />
                                <span>NETFARM Pro</span>
                            </div>
                            <div className="links">
                                <ul>
                                    <li className={render === 1 ? 'active' : 'none'} onClick={ProductHandler}>
                                        <a href="#">
                                            <AiOutlineShopping />
                                            <span className="border">Mặt hàng</span>
                                        </a>
                                    </li>
                                    <li className={render === 2 ? 'active' : 'none'} onClick={CategoryHandler}>
                                        <a href="#">
                                            <AiOutlinePieChart />
                                            <span className="border">Danh mục</span>
                                        </a>
                                    </li>

                                    <li className={render === 3 ? 'active' : 'none'} onClick={OrderHandler}>
                                        <a href="#">
                                            <AiOutlineShoppingCart />
                                            <span className="border">Đơn hàng</span>
                                        </a>
                                    </li>
                                    <li className={render === 4 ? 'active' : 'none'} onClick={DashboardHandler}>
                                        <a href="#">
                                            <AiOutlineAppstore />
                                            <span className="border">Thống kê</span>
                                        </a>
                                    </li>

                                    <li className={render === 5 ? 'active' : 'none'} onClick={ReportHandler}>
                                        <a href="#">
                                            <AiOutlineUsergroupAdd />
                                            <span className="border">Báo cáo</span>
                                        </a>
                                    </li>
                                    <li className={render === 6 ? 'active' : 'none'} onClick={() => setRender(6)}>
                                        <a href="#">
                                            <AiOutlineMessage />
                                            <span className="border">Tin nhắn</span>
                                        </a>
                                    </li>
                                    <li className={render === 7 ? 'active' : 'none'} onClick={() => setRender(7)}>
                                        <a href="#">
                                            <AiOutlineSetting />
                                            <span className="border">Cài đặt</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Section>
                </div>
                <div className="manage_content">
                    {render == 1 && <Manage></Manage>}
                    {render == 2 && <ManageCategory></ManageCategory>}
                    {render == 3 && <ManageOrder></ManageOrder>}
                    {render == 4 && <Dashboard></Dashboard>}
                    {render == 5 && <SaleReport></SaleReport>}
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;
const Section = styled.section`
    // position: fixed;
    left: 0;
    background-color: #f8f9ef;
    height: 150vh;
    width: 18vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 0;
    gap: 2rem;
    .top {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;
        .brand {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1.3rem 0;
            svg {
                color: blue;
                font-size: 2rem;
            }
            span {
                font-size: 1.5rem;
                font-weight: bold;
                color: black;
            }
        }
        .links {
            display: flex;
            justify-content: center;
            ul {
                list-style-type: none;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                li {
                    width: 100%;
                    padding: 0.6rem 2rem;
                    border-radius: 0.3rem;
                    &:hover {
                        background-color: black;
                        a {
                            color: white;
                        }
                    }
                    a {
                        text-decoration: none;
                        display: flex;
                        gap: 1rem;
                        color: grey;
                        svg {
                            font-size: 1.4rem;
                        }
                        span {
                            display: flex;
                            gap: 2rem;
                        }
                    }
                }
                .active {
                    background-color: black;
                    a {
                        color: white;
                    }
                }
            }
        }
    }
    .map {
        width: 90%;
        display: flex;
        background-color: #ebecf1;
        padding-top: 10px;
        padding-bottom: 10px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-top: -25px;
        border-radius: 0.5rem;
        svg {
            color: blue;
            font-size: 2rem;
        }
    }
    .logout {
        padding: 0.6rem 3rem;
        margin-left: -2rem;
        a {
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            color: black;
            gap: 1rem;
            svg {
                font-size: 1.4rem;
            }
            span {
                display: flex;
            }
        }
    }
`;

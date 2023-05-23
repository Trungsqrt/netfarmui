import { Col, Layout, Menu, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    AiFillCodeSandboxCircle,
    AiOutlineAppstore,
    AiOutlineMessage,
    AiOutlinePieChart,
    AiOutlineSetting,
    AiOutlineShopping,
    AiOutlineShoppingCart,
    AiOutlineUsergroupAdd,
} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NewHeader from '../../client_farm/share/newheader/NewHeader';
import Demo from '../ManageFeedback/Demo';
import Radio from '../ManageFeedback/Radio';
import '../css/style.css';
import ManageCategory from './ManageCategory/ManageCategory';
import ManageOrder from './ManageOrder/ManageOrder';
import Manage from './ManageProduct/Manage';
import SaleReport from './ManageReport/SaleReport';
import Dashboard from './ManageStatistical/Dashboard';
const ManageProduct = () => {
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [render, setRender] = useState(1);

    const currentTab = Number(localStorage.getItem('currentTab'));
    useEffect(() => {
        if (currentTab) {
            setRender(currentTab);
        }
        if (currentUser.roleName !== 'Admin') {
            navigate('*');
        }
    }, []);
    const changeTag = (e) => {
        setRender(e.key);
        localStorage.setItem('currentTab', e.key);
    };

    return (
        <Layout>
            <Layout style={{ display: 'block', marginBottom: '150px' }}>
                <NewHeader></NewHeader>
            </Layout>
            <Layout style={{ paddingBottom: '40px' }}>
                <Row>
                    <Col span={4} offset={1}>
                        <Layout style={{ background: '#000022', height: '100%', borderRadius: '10px' }}>
                            <div className="brand" style={{ padding: '20px 0px' }}>
                                <AiFillCodeSandboxCircle color="white" fontSize="4em" />
                                <span style={{ color: 'white', fontSize: '28px' }}>NETFARM Pro</span>
                            </div>
                            <Menu
                                theme="dark"
                                mode="vertical"
                                style={{
                                    display: 'block',
                                    padding: '30px 0px',
                                    border: 'none',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    color: 'white',
                                }}
                                defaultSelectedKeys={[`${currentTab}`]}
                                onClick={changeTag}
                                items={[
                                    {
                                        key: '1',
                                        label: <span style={{ fontSize: '18px' }}>Mặt hàng</span>,
                                        icon: <AiOutlineShopping style={{ color: 'white', fontSize: '2em' }} />,
                                    },
                                    {
                                        key: '2',
                                        label: <span style={{ fontSize: '18px' }}>Danh mục</span>,
                                        icon: <AiOutlinePieChart style={{ color: 'white', fontSize: '2em' }} />,
                                    },
                                    {
                                        key: '3',
                                        label: <span style={{ fontSize: '18px' }}>Đơn hàng</span>,
                                        icon: <AiOutlineShoppingCart style={{ color: 'white', fontSize: '2em' }} />,
                                    },
                                    {
                                        key: '4',
                                        label: <span style={{ fontSize: '18px' }}>Thống kê</span>,
                                        icon: <AiOutlineAppstore style={{ color: 'white', fontSize: '2em' }} />,
                                    },
                                    {
                                        key: '5',
                                        label: <span style={{ fontSize: '18px' }}>Báo cáo</span>,
                                        icon: <AiOutlineUsergroupAdd style={{ color: 'white', fontSize: '2em' }} />,
                                    },
                                    {
                                        key: '6',
                                        label: <span style={{ fontSize: '18px' }}>Phản hồi</span>,
                                        icon: <AiOutlineMessage style={{ color: 'white', fontSize: '2em' }} />,
                                    },
                                    {
                                        key: '7',
                                        label: <span style={{ fontSize: '18px' }}>Demo mode</span>,
                                        icon: <AiOutlineSetting style={{ color: 'white', fontSize: '2em' }} />,
                                    },
                                ]}
                            />
                        </Layout>
                    </Col>
                    <Col span={18}>
                        <div className="manage_content" style={{ height: '100%' }}>
                            {render == 1 && <Manage></Manage>}
                            {render == 2 && <ManageCategory></ManageCategory>}
                            {render == 3 && <ManageOrder></ManageOrder>}
                            {render == 4 && <Dashboard></Dashboard>}
                            {render == 5 && <SaleReport></SaleReport>}
                            {render == 6 && <Radio></Radio>}
                            {render == 7 && <Demo></Demo>}
                        </div>
                    </Col>
                </Row>
            </Layout>
            {user === 'Expert' && navigate('/adminHome')}
            {user === 'Farmer' && navigate('/')}
        </Layout>
        
    );
};

export default ManageProduct;
const Section = styled.section`
    left: 0;
    background-color: #fff;
    height: 90%;
    width: 18vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 0;
    gap: 2rem;
    border: 1px solid #ccc;
    margin-top: 20px;
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
                        color: black;
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

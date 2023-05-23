import { CloudFilled, MenuOutlined } from '@ant-design/icons';
import { Button, Image, Layout, Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/image/logonetfarm.png';
import NotificationDetail from '../../../detailBar/notificationDetail/NotificationDetail';
import ToolbarFarmer from '../../../detailBar/toolbarFarmer/ToolbarFarmer';
import './header.css';
import ToolbarExpert from '../../../detailBar/toolbarExpert/ToolbarExpert';
import ToolbarAdmin from '../../../detailBar/toolbarAdmin/ToolbarAdmin';

const NewHeader = () => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=danang&appid=69424b95ee94abbbe370a393829f81e3';
    const CartURL = 'https://localhost:44303/api/Carts';
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [iconState, setIconState] = useState('');
    const [timee, setTimee] = useState();
    const [notification, setNotification] = useState(false);
    const [toolbar, setToolbar] = useState(false);
    const [isLoggin, setIsLoggin] = useState(false);
    const [searchContent, setSearchContent] = useState('');
    const [articles, setArticles] = useState([]);
    const [currentArticles, setCurrentArticles] = useState([]);
    const [count, setCount] = useState(0);

    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const [render, setRender] = useState(0);
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(CartURL);
            const data = response.data;
            const user = JSON.parse(localStorage.getItem('user'));
            var userId = '';
            if (user) {
                userId = user.userId;
                const filter = data.filter((item) => item['userId'] === userId);
                setCount(filter.length);
            }
        };
        fetchData();
    }, []);

    let icon;
    useEffect(() => {
        axios.get(url).then((response) => {
            const res = response.data;
            const result = res.main.temp - 273.15;
            setData(Math.round(result));
            icon = [...res.weather];
            icon = icon[0].icon;
            setIconState(icon);
        });
    }, []);

    useEffect(() => {
        const user = localStorage.getItem('user');
        user ? setIsLoggin(true) : setIsLoggin(false);
    }, [isLoggin]);

    function showNotificationHandler() {
        notification ? setNotification(false) : setNotification(true);
    }

    function hideNotificationHandler() {
        setNotification(false);
    }

    function showToolbar() {
        toolbar ? setToolbar(false) : setToolbar(true);
    }

    function hideToolbar() {
        setToolbar(false);
    }

    function cartHandler() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user === null) return navigate('/login');
        return navigate('/shop/cart');
    }

    let settingIcon = (
        <>
            <MenuOutlined onClick={showToolbar} style={{ color: 'black', fontWeight: 'bold' }} />
            {toolbar &&
                (user === 'Admin' ? (
                    <>
                        <ToolbarAdmin />
                    </>
                ) : user === 'Expert' ? (
                    <>
                        <ToolbarExpert />
                    </>
                ) : (
                    <>
                        <ToolbarFarmer />
                    </>
                ))}
        </>
    );

    useEffect(() => {
        if (currentUser) setUser(currentUser.roleName);
        const getData = async () => {
            const res = await axios.get('https://localhost:44303/api/Article');
            const response = res.data;
            setArticles([...response]);
        };
        getData();
    }, []);

    useEffect(() => {
        if (searchContent != '') {
            const resultArray = articles.filter((item) =>
                item.title.toLowerCase().includes(searchContent.toLowerCase()),
            );
            setCurrentArticles([...resultArray]);
        } else if (searchContent === '') {
            setCurrentArticles([]);
        }
    }, [searchContent]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    function truncate(str, n) {
        return str.length > n ? str.slice(0, n - 1) + '...' : str;
    }

    return (
        <Layout>
            <div id="main-navbar" className="navbar">
                <div style={{display:'flex',justifyContent:'space-around'}}>
                    <Image src={logo} style={{ height: '60px' }} />
                    <div style={{ textAlign: 'center', color: 'black', flexWrap: 'nowrap' }}>
                        <CloudFilled style={{ color: '#00CCFF', fontSize: 40 }} />
                        <h4 style={{ color: 'white', fontSize: 20 }}>Da Nang, {data}°C</h4>
                    </div>
                </div>
                <Space no-wrap>
                    <ul className={user !== 'Farmer'? 'ul-admin' : ''}>
                        {user === 'Admin' ? (
                            <>
                                <li>
                                    <Link to="/adminHome">Trang chủ</Link>
                                </li>

                                <li>
                                    <Link to="/admin">Quản lý</Link>
                                </li>

                                <li>
                                    <Link to="/manageProduct">Bán hàng</Link>
                                </li>

                                <li>
                                    <Link to="/inforPage">Thông tin</Link>
                                </li>
                                {/* <li>
                                    <Link to="/PlantDetect">Nhận diện cây trồng</Link>
                                </li> */}
                            </>
                        ) : user === 'Expert' ? (
                            <>
                                <li>
                                    <Link to="/adminHome">Trang chủ</Link>
                                </li>

                                <li>
                                    <Link to="/expert">Quản lý</Link>
                                </li>

                                <li>
                                    <Link to="/inforPage">Thông tin</Link>
                                </li>
                                {/* <li>
                                    <Link to="/PlantDetect">Nhận diện cây trồng</Link>
                                </li>
                                <li>
                                    <Link to="/healthPlant">Nhận diện bệnh</Link>
                                </li> */}
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/">Trang chủ</Link>
                                </li>
                                <li>
                                    <Link to="/inforPage">Thông tin</Link>
                                </li>

                                <li>
                                    <Link to="/shop">Mua hàng</Link>
                                </li>
                                <li>
                                    <Link to="/PlantDetect">Nhận diện cây trồng</Link>
                                </li>
                                <li>
                                    <Link to="/healthPlant">Nhận diện bệnh</Link>
                                </li>
                            </>
                        )}

                        <li>
                            <Space>
                                {user === 'Admin' || user === 'Expert' ? (
                                    <></>
                                ) : (
                                    <>
                                        <section className="notificationBox">
                                            <button className="button-setting" onClick={cartHandler}>
                                                <i className="fa-solid fa-cart-shopping"></i>
                                                <div className="cartNum">{count}</div>
                                            </button>
                                        </section>
                                    </>
                                )}
                                <section className="notificationBox">
                                    <button className="button-setting" onClick={showNotificationHandler}>
                                        <i className="fa-solid fa-bell settings"></i>
                                    </button>
                                    {notification && <NotificationDetail />}
                                </section>
                                {isLoggin && settingIcon}
                                {!isLoggin && (
                                    <>
                                        <Button
                                            type="primary"
                                            onClick={() => navigate('/login')}
                                            shape="round"
                                            size="medium"
                                            danger
                                        >
                                            Đăng nhập
                                        </Button>
                                        <Button
                                            type="primary"
                                            onClick={() => navigate('/login')}
                                            shape="round"
                                            size="medium"
                                            danger
                                        >
                                            Đăng ký
                                        </Button>
                                    </>
                                )}
                            </Space>
                        </li>
                    </ul>
                </Space>
            </div>
        </Layout>
    );
};

export default NewHeader;

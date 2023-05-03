import './Header.css';
import styles from './Header.module.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import navbarImage from '../../../../assets/image/logonetfarm.png';
import ToolbarFarmer from '../../../detailBar/toolbarFarmer/ToolbarFarmer';
import NotificationDetail from '../../../detailBar/notificationDetail/NotificationDetail';
import { Link, useNavigate } from 'react-router-dom';
const Header = () => {
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
        // console.log('user', user);
        if (user === null) return navigate('/login');
        return navigate('/shop/cart');
    }

    let settingIcon = (
        <section>
            <button
                className="button-setting"
                onClick={showToolbar}
                // onBlur={hideToolbar}
            >
                <i className="fa-solid fa-bars settings"></i>
            </button>
            {toolbar && <ToolbarFarmer />}
        </section>
    );

    useEffect(() => {
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
        <div style={{ backgroundColor: 'white' }}>
            <div className="container-navbar">
                <div className="info-header">
                    Welcome to NetFarm Web Service
                    <div className="info">
                        {/* <i className="fa-solid fa-sun"></i> */}
                        <img
                            src={`http://openweathermap.org/img/wn/${iconState}@2x.png`}
                            alt=""
                            className={styles.iconWeather}
                        />
                        <span className={styles.temperature}>Da Nang, {data}°C</span>
                    </div>
                    <div className="info">
                        <i className="fa-solid fa-envelope"></i>
                        <span>needhelp@company.com</span>
                    </div>
                    <div className="info">
                        <i className="fa-solid fa-clock"></i>
                        <span>Mon - Sat 8:00 - 18:30, Sunday</span>
                    </div>
                </div>
                <nav className="navbar">
                    <Link to="/">
                        <img className="logo" src={navbarImage} alt="logo"></img>
                    </Link>
                    <ul className="navbarTask">
                        <li className="navbarTask_item">
                            <Link to="/">Trang chủ</Link>
                        </li>
                        <li className="navbarTask_item">
                            <Link to="/inforPage">Thông tin</Link>
                        </li>
                        <li className="navbarTask_item">
                            <Link to="/shop">Mua hàng</Link>
                        </li>
                        <li className="navbarTask_item">
                            <Link to="/MyComponent">Nhận diện</Link>
                        </li>
                    </ul>
                    <form className="form-search" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search"
                            name="search"
                            autoComplete="none"
                            onChange={(e) => setSearchContent(e.target.value)}
                            value={searchContent}
                        ></input>
                        <button className="btn-search">
                            <i className="icon-searchicon fa-solid fa-magnifying-glass icon-search"></i>
                        </button>
                    </form>
                    <div className="calling-info">
                        <i className="fa-solid fa-phone-volume phone"></i>
                        <div className="calling">
                            <p className="info-detail">Call Anytime</p>
                            <p className="info-detail">02 123 888 000</p>
                        </div>
                    </div>
                    <div className="setting-group">
                        <section className={styles.notificationBox}>
                            <button className="button-setting" onClick={cartHandler}>
                                <i className="fa-solid fa-cart-shopping"></i>
                                <div className="cartNum">{count}</div>
                            </button>
                        </section>
                        <section className={styles.notificationBox}>
                            <button
                                className="button-setting"
                                onClick={showNotificationHandler}
                                // onBlur={hideNotificationHandler}
                            >
                                <i className="fa-solid fa-bell settings"></i>
                            </button>
                            {notification && <NotificationDetail />}
                        </section>
                        {isLoggin && settingIcon}
                        {!isLoggin && (
                            <Link to="/login" className={styles.loginLink}>
                                Đăng nhập/ Đăng ký
                            </Link>
                        )}
                    </div>
                </nav>
                {currentArticles.length > 0 && (
                    <div className={styles.searchContainer}>
                        <section className={styles.itemWrap}>
                            {currentArticles.map((i, index) => (
                                <section
                                    className={`${styles.item}`}
                                    key={index}
                                    onClick={() => {
                                        navigate(`/detail/${i.id}`);
                                    }}
                                >
                                    {/* ${styles.nonRead} */}
                                    <section className={styles.imageS}>
                                        <img src={i.imageURL} className={styles.imageSection}></img>
                                    </section>
                                    <p className={styles.contentSection}>
                                        <section className={styles.notificationTitle}>
                                            <strong>{truncate(i.title, 30)}</strong>
                                        </section>
                                    </p>
                                </section>
                            ))}
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;

import React, { useState, useEffect } from 'react';
import styles from './AdminPage.module.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../admin_farm/share/header/Header';

function AdminPage() {
    const userUrl = 'https://localhost:44303/api/Users';
    const articleUrl = 'https://localhost:44303/api/Article';
    const scheduleUrl = 'https://localhost:44303/api/ScheduleTask';

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [render, setRender] = useState(1); //1: User, 2: Posts, 3:Schedule
    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    useEffect(() => {
        setUser(currentUser.roleName);
        async function getData() {
            const Dataset = await axios.get(userUrl);

            Dataset.data.forEach((item) => {
                const value = {
                    id: item.id,
                    name: item.fullName,
                    phone: item.phone,
                    cccd: item.identifyCard,
                };
                setData((prevData) => [...prevData, value]);
            });
        }
        getData();
    }, []);

    const UserHandler = () => {
        setRender(1);
        async function getData() {
            setData([]);
            const Dataset = await axios.get(userUrl);
            Dataset.data.forEach((item) => {
                const value = {
                    id: item.id,
                    name: item.fullName,
                    phone: item.phone,
                    cccd: item.identifyCard,
                };
                setData((prevData) => [...prevData, value]);
            });
        }

        getData();
    };

    const PostHandler = () => {
        setRender(2);
        async function getData() {
            setData([]);
            const Dataset = await axios.get(articleUrl);

            Dataset.data.forEach((item) => {
                const value = {
                    id: item.id,
                    title: item.title,
                    datePost: item.datePost.slice(0, 10),
                    dateUpdate: item.dateUpdate,
                };
                setData((prevData) => [...prevData, value]);
            });
        }

        getData();
    };

    const ScheduleHandler = () => {
        setRender(3);
        async function getData() {
            setData([]);
            const Dataset = await axios.get(scheduleUrl);

            Dataset.data.forEach((item) => {
                const value = {
                    id: item.id,
                    name: item.name,
                    dateStart: item.dateStart.slice(0, 10),
                    dateEnd: item.dateEnd.slice(0, 10),
                };
                setData((prevData) => [...prevData, value]);
            });
        }

        getData();
    };

    const handleDeletePost = (index) => {
        async function deleteHandler() {
            await axios.delete(articleUrl + '/' + index);
            PostHandler();
        }
        deleteHandler();
    };

    const handleDeleteUser = (index) => {
        async function deleteHandler() {
            await axios.delete(userUrl + '/' + index);
            UserHandler();
        }
        deleteHandler();
    };

    const handleDeleteSchedule = (index) => {
        async function deleteHandler() {
            await axios.delete(scheduleUrl + '/' + index);
            ScheduleHandler();
        }
        deleteHandler();
    };

    const handleAddArticle = () => {
        navigate('/ArticleHandler');
    };

    const handleAddSchedule = () => {
        navigate('/CalenderHandler');
    };

    return (
        <div>
            {user === 'Admin' && (
                <>
                    <Header />
                    <div className={styles.body}>
                        <div className={styles.container}>
                            <nav>
                                <ul className={styles.tabList}>
                                    <li className={styles.itemList} onClick={UserHandler}>
                                        Users
                                    </li>
                                    <li className={styles.itemList} onClick={PostHandler}>
                                        Posts
                                    </li>
                                    <li className={styles.itemList} onClick={ScheduleHandler}>
                                        Schedules
                                    </li>
                                </ul>
                            </nav>
                            <section className={styles.bodyContainer}>
                                <form
                                    className="form-search"
                                    style={{
                                        alignSelf: 'end',
                                        marginRight: '105px',
                                        marginBottom: '10px',
                                        marginTop: '-10px',
                                    }}
                                >
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search"
                                        name="search"
                                    ></input>
                                    <button className="btn-search">
                                        <i className="fa-solid fa-magnifying-glass icon-search"></i>
                                    </button>
                                </form>
                                <table>
                                    {render == 1 && (
                                        <tbody>
                                            <tr>
                                                <th className={styles.th1}>Id</th>
                                                <th className={styles.th1}>Tên</th>
                                                <th className={styles.th1}>Số điện thoại</th>
                                                <th className={styles.th1}>Email</th>
                                                <th className={styles.th1}>CCCD</th>
                                            </tr>
                                            {data.map((item, index) => (
                                                <tr key={index}>
                                                    <th>{item.id}</th>
                                                    <th>{item.name}</th>
                                                    <th>{item.user}</th>
                                                    <th>{item.email}</th>
                                                    <th>{item.cccd}</th>
                                                    <th
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleDeleteUser(item.id)}
                                                    >
                                                        &times;
                                                    </th>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}
                                    {render == 2 && (
                                        <tbody>
                                            <i className="fa-solid fa-plus" onClick={handleAddArticle}></i>
                                            <tr>
                                                <th className={styles.th1}>Id</th>
                                                <th className={styles.th1}>Tiêu đề</th>
                                                <th className={styles.th1}>Ngày đăng</th>
                                                <th className={styles.th1}>Ngày cập nhật</th>
                                            </tr>
                                            {data.map((item) => (
                                                <tr key={item.id}>
                                                    <th width="10%">{item.id}</th>
                                                    <th width="50%">{item.title}</th>
                                                    <th width="20%">{item.datePost}</th>
                                                    <th width="20%">{item.dateUpdate}</th>
                                                    <th
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleDeletePost(item.id)}
                                                    >
                                                        &times;
                                                    </th>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}

                                    {render == 3 && (
                                        <tbody>
                                            <i className="fa-solid fa-plus" onClick={handleAddSchedule}></i>
                                            <tr>
                                                <th className={styles.th1}>Id</th>
                                                <th className={styles.th1}>Tên</th>
                                                <th className={styles.th1}>Bắt đầu</th>
                                                <th className={styles.th1}>Kết thúc</th>
                                            </tr>
                                            {data.map((item) => (
                                                <tr key={item.id}>
                                                    <th width="10%">{item.id}</th>
                                                    <th width="50%">{item.name}</th>
                                                    <th width="20%">{item.dateStart}</th>
                                                    <th width="20%">{item.dateEnd}</th>
                                                    <th
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleDeleteSchedule(item.id)}
                                                    >
                                                        &times;
                                                    </th>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}
                                </table>
                            </section>
                        </div>
                    </div>
                </>
            )}
            {user === 'Expert' && navigate('/adminHome')}
            {user === 'Farmer' && navigate('/')}
        </div>
    );
}

export default AdminPage;

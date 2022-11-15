import React, { useState, useEffect } from 'react';
import styles from './ExpertPage.module.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../admin_farm/share/header/Header';

function ExpertPage() {
    const articleUrl = 'https://localhost:44303/api/Article';
    const scheduleUrl = 'https://localhost:44303/api/ScheduleTask';
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [render, setRender] = useState(1); //1: Posts, 2: Schedule
    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);

    useEffect(() => {
        setUser(currentUser.roleName);
        async function getData() {
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
    }, []);

    const PostHandler = () => {
        setRender(1);
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
        setRender(2);
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

    const handleEditPost = (id) => {
        navigate(`/editArticle/${id}`);
    };

    const handleEditSchedule = (id) => {
        navigate(`/editSchedule/${id}`);
    };
    return (
        <div>
            {user === 'Expert' && (
                <>
                    <Header />
                    <div className={styles.body}>
                        <div className={styles.container}>
                            <nav>
                                <ul className={styles.tabList}>
                                    <li className={styles.itemList} onClick={PostHandler}>
                                        Posts
                                    </li>
                                    <li className={styles.itemList} onClick={ScheduleHandler}>
                                        Schedules
                                    </li>
                                </ul>
                            </nav>
                            <section className={styles.bodyContainer}>
                                {/* <form
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
                                </form> */}
                                <table>
                                    {render == 1 && (
                                        <tbody>
                                            <i
                                                id={styles.iconAdd}
                                                className="fa-solid fa-plus"
                                                onClick={handleAddArticle}
                                            ></i>
                                            <section className={styles.tableContent}>
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
                                                        <th
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleEditPost(item.id)}
                                                        >
                                                            <i class="fa-solid fa-pen-to-square"></i>
                                                        </th>
                                                    </tr>
                                                ))}
                                            </section>
                                        </tbody>
                                    )}

                                    {render == 2 && (
                                        <tbody>
                                            <i
                                                id={styles.iconAdd}
                                                className="fa-solid fa-plus"
                                                onClick={handleAddSchedule}
                                            ></i>
                                            <section className={styles.tableContent}>
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
                                                        <th
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleEditSchedule(item.id)}
                                                        >
                                                            <i class="fa-solid fa-pen-to-square"></i>
                                                        </th>
                                                    </tr>
                                                ))}
                                            </section>
                                        </tbody>
                                    )}
                                </table>
                            </section>
                        </div>
                    </div>
                </>
            )}

            {user === 'Admin' && navigate('/AdminHome')}
            {user === 'Farmer' && navigate('/')}
        </div>
    );
}

export default ExpertPage;

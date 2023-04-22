import React, { useState, useEffect } from 'react';
import styles from './AdminPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../admin_farm/share/header/Header';
import './AdminPage.css';

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

    const [schedule, setSchedule] = useState([]);
    const [flag, setFlag] = useState(false);
    const [idHandle, setIdHandle] = useState(-1);
    const [userSearch, setUserSearch] = useState('');
    const [currentUsers, setCurrentUsers] = useState([]);
    const [postSearch, setPostSearch] = useState('');
    const [currentPosts, setCurrentPosts] = useState([]);

    useEffect(() => {
        setUser(currentUser.roleName);
        async function getData() {
            const d = await axios.get(userUrl);
            const Dataset = d.data.filter((item) => item['fullName'] !== 'Admin');
            Dataset.forEach((item) => {
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

        async function getSchedule() {
            const res = await axios.get('https://localhost:44303/api/Schedule');
            const data = res.data;
            setSchedule(data);
        }

        getSchedule();
    }, []);

    useEffect(() => {
        setCurrentUsers([...data]);
    }, [data]);

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
            setCurrentPosts([]);
            const Dataset = await axios.get(articleUrl);
            Dataset.data.forEach((item) => {
                const value = {
                    id: item.id,
                    title: item.title,
                    datePost: item.datePost.slice(0, 10),
                    dateUpdate: item.dateUpdate?.slice(0, 10),
                };
                setData((prevData) => [...prevData, value]);
                setCurrentPosts((prevData) => [...prevData, value]);
            });
        }

        getData();
    };

    const handleDeletePost = (index) => {
        if (window.confirm('Xác nhận xoá!')) {
            async function deleteHandler() {
                await axios.delete(articleUrl + '/' + index);
                PostHandler();
            }
            deleteHandler();
        }
    };

    const handleDeleteUser = (index) => {
        if (window.confirm('Xác nhận xoá!')) {
            async function deleteHandler() {
                await axios.delete(userUrl + '/' + index);
                UserHandler();
            }
            deleteHandler();
        }
    };

    const handleAddArticle = () => {
        navigate('/ArticleHandler');
    };

    const handleAddSchedule = () => {
        navigate('/CalenderHandler');
    };

    function handlerChange(e) {
        setData([]);
        const id = e.target.value;

        if (id === 'Chọn loại cây') {
            setFlag(false);
        } else {
            setFlag(true);
            setIdHandle(id);
        }
        const getData = async () => {
            const res = await axios.get(scheduleUrl);
            const dataFilterYet = res.data;
            dataFilterYet.forEach((item) => {
                if (item.scheduleId === id) {
                    const value = {
                        id: item.id,
                        name: item.name,
                        dateStart: item.dateStart.slice(0, 10),
                        dateEnd: item.dateEnd.slice(0, 10),
                        scheduleId: item.scheduleId,
                    };
                    setData((prev) => [...prev, value]);
                }
            });
        };
        getData();
    }

    const handleOnChangeSearchUser = (e) => {
        setUserSearch(e.target.value);
    };

    useEffect(() => {
        if (userSearch !== '') {
            const resultArray = data.filter((item) => item.name.toLowerCase().includes(userSearch.toLowerCase()));
            setCurrentUsers([...resultArray]);
        } else if (userSearch === '') {
            setCurrentUsers([...data]);
        }
    }, [userSearch]);

    const handleOnChangePostSearch = (e) => {
        setPostSearch(e.target.value);
    };

    useEffect(() => {
        if (postSearch !== '') {
            const resultArray = data.filter((item) => item.title.toLowerCase().includes(postSearch.toLowerCase()));
            setCurrentPosts([...resultArray]);
        } else if (postSearch === '') {
            setCurrentPosts([...data]);
        }
    }, [postSearch]);

    function truncateString(str) {
        if (str.length > 40) {
            return str.slice(0, 40) + '...';
        } else {
            return str;
        }
    }

    function truncateString2(str) {
        if (str.length > 5) {
            return str.slice(0, 5) + '...';
        } else {
            return str;
        }
    }

    return (
        <div>
            {user === 'Admin' && (
                <>
                    <Header />
                    <div className={styles.body}>
                        <div className={styles.left}>
                            <h3 className={styles.title}>Admin Page</h3>
                            <ul className={styles.nav}>
                                <li
                                    className={render === 1 ? styles.navItemSelected : styles.navItem}
                                    onClick={UserHandler}
                                >
                                    <i class="menuIconItem fa-regular fa-user"></i>
                                    Users
                                </li>
                                <li
                                    className={render === 2 ? styles.navItemSelected : styles.navItem}
                                    onClick={PostHandler}
                                >
                                    <i class="menuIconItem fa-regular fa-newspaper"></i>
                                    Posts
                                </li>
                            </ul>
                        </div>
                        <div className={styles.right}>
                            <section className={styles.bodyContainer}>
                                <table className={styles.tableContainerr}>
                                    {render === 1 && (
                                        <div>
                                            {/* <tbody> */}
                                            <div className={styles.searchContainer}>
                                                <input
                                                    type="text"
                                                    className={styles.searchBar}
                                                    autoComplete="none"
                                                    onChange={handleOnChangeSearchUser}
                                                ></input>
                                            </div>

                                            <section className={styles.tableContent}>
                                                <tr className={styles.tableContainerDiv}>
                                                    <th className={styles.th1} width="10%">
                                                        <strong>ID</strong>
                                                    </th>
                                                    <th className={styles.th1} width="30%">
                                                        <strong>Tên</strong>
                                                    </th>
                                                    <th className={styles.th1} width="15%">
                                                        <strong>Số điện thoại</strong>
                                                    </th>
                                                    <th className={styles.th1} width="30%">
                                                        <strong>Email</strong>
                                                    </th>
                                                    <th className={styles.th1} width="15%">
                                                        <strong>CCCD</strong>
                                                    </th>
                                                    <th className={styles.th1}>
                                                        <strong>Xóa</strong>
                                                    </th>
                                                </tr>
                                                {currentUsers.map((item, index) => (
                                                    <tr key={index}>
                                                        <th width="10%">{item.id}</th>
                                                        <th width="30%">{item.name}</th>
                                                        <th width="15%">{item.user}</th>
                                                        <th width="30%">{item.email}</th>
                                                        <th width="15%">{item.cccd}</th>
                                                        <th
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleDeleteUser(item.id)}
                                                        >
                                                            <i class="trashcan fa-solid fa-trash"></i>
                                                        </th>
                                                    </tr>
                                                ))}
                                            </section>
                                            {/* </tbody> */}
                                        </div>
                                    )}
                                    {render === 2 && (
                                        <div>
                                            {/* <tbody> */}
                                            <div className={styles.searchContainer}>
                                                <button id={styles.iconAdd} onClick={handleAddArticle}>
                                                    Thêm
                                                </button>
                                                <input
                                                    type="text"
                                                    className={styles.searchBar}
                                                    autoComplete="none"
                                                    onChange={handleOnChangePostSearch}
                                                ></input>
                                            </div>
                                            <section className={styles.tableContent}>
                                                <tr className={styles.tableContainerDiv}>
                                                    <th className={styles.th1} width="5%">
                                                        <strong>Id</strong>
                                                    </th>
                                                    <th className={styles.th1} width="55%">
                                                        <strong>Tiêu đề</strong>
                                                    </th>
                                                    <th className={styles.th1} width="20%">
                                                        <strong>Ngày đăng</strong>
                                                    </th>
                                                    <th className={styles.th1} width="20%">
                                                        <strong>Ngày cập nhật</strong>
                                                    </th>
                                                    <th className={styles.th1}>
                                                        <strong>Xóa</strong>
                                                    </th>
                                                </tr>

                                                {currentPosts?.map((item) => (
                                                    <tr key={item.id}>
                                                        <th width="5%">{item.id}</th>
                                                        <th width="55%">{truncateString(item.title)}</th>
                                                        <th width="20%">{item.datePost}</th>
                                                        <th width="20%">{item.dateUpdate}</th>
                                                        <th
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleDeletePost(item.id)}
                                                        >
                                                            <i class="trashcan fa-solid fa-trash"></i>
                                                        </th>
                                                    </tr>
                                                ))}
                                            </section>
                                            {/* </tbody> */}
                                        </div>
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

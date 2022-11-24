import React, { useState, useEffect } from 'react';
import styles from './AdminPage.module.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../admin_farm/share/header/Header';

function AdminPage() {
    const userUrl = 'https://localhost:44303/api/Users';
    const articleUrl = 'https://localhost:44303/api/Article';
    const scheduleUrl = 'https://localhost:44303/api/ScheduleTask';
    const ScheUrl = 'https://localhost:44303/api/Schedule';

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [render, setRender] = useState(1); //1: User, 2: Posts, 3:Schedule
    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);

    const [schedule, setSchedule] = useState([]);
    const [flag, setFlag] = useState(false);
    const [idHandle, setIdHandle] = useState(-1);

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

        async function getSchedule() {
            const res = await axios.get('https://localhost:44303/api/Schedule');
            const data = res.data;
            setSchedule(data);
        }

        getSchedule();
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
                    dateUpdate: item.dateUpdate?.slice(0, 10),
                };
                setData((prevData) => [...prevData, value]);
            });
        }

        getData();
    };

    const ScheduleHandler = () => {
        setRender(3);
        setData([]);

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

        // getData();
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

    const handleDeleteSchedule = () => {
        const dataFil = [];
        axios
            .get(scheduleUrl)
            .then((res) => {
                res.data.forEach((item) => {
                    if (item.scheduleId == idHandle) dataFil.push(item.id);
                });

                //delete tasks
                dataFil.forEach((item) => {
                    const dele = async () => {
                        await axios.delete(scheduleUrl + '/' + item);
                    };
                    dele();
                });
            })
            .then(() => {
                //delete schedule
                axios.delete(ScheUrl + '/' + idHandle);
            })
            .then(() => {
                ScheduleHandler();
            })
            .then(() => {
                async function getSchedule() {
                    const res = await axios.get('https://localhost:44303/api/Schedule');
                    const data = res.data;
                    setSchedule(data);
                }
                getSchedule();
            });
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

        if (id == 'Chọn loại cây') {
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
                                <table>
                                    {render == 1 && (
                                        <tbody>
                                            <section className={styles.tableContent}>
                                                <tr>
                                                    <th className={styles.th1}>Id</th>
                                                    <th className={styles.th1}>Tên</th>
                                                    <th className={styles.th1}>Số điện thoại</th>
                                                    <th className={styles.th1}>Email</th>
                                                    <th className={styles.th1}>CCCD</th>
                                                </tr>
                                                {data.map((item, index) => (
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
                                                            &times;
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
                                                    </tr>
                                                ))}
                                            </section>
                                        </tbody>
                                    )}

                                    {render == 3 && (
                                        <div className={styles.bodyContainer2}>
                                            <select
                                                onChange={handlerChange}
                                                className={styles.selectSection}
                                                style={{ marginLeft: '0px' }}
                                            >
                                                <option>Chọn loại cây</option>
                                                {schedule
                                                    ? schedule.map((sche, index) => (
                                                          <option value={sche.id} key={sche.id}>
                                                              {sche.name}
                                                          </option>
                                                      ))
                                                    : ''}
                                            </select>
                                            <tbody>
                                                <i
                                                    id={styles.iconAdd}
                                                    className="fa-solid fa-plus"
                                                    onClick={handleAddSchedule}
                                                ></i>

                                                {flag && (
                                                    <i class="fa-solid fa-trash" onClick={handleDeleteSchedule}></i>
                                                )}

                                                <section className={styles.tableContent}>
                                                    <tr>
                                                        <th className={styles.th1}>Id</th>
                                                        <th className={styles.th1}>Tên</th>
                                                        <th className={styles.th1}>Bắt đầu</th>
                                                        <th className={styles.th1}>Kết thúc</th>
                                                        <th className={styles.th1}>Id lịch</th>
                                                    </tr>
                                                    {data.map((item) => (
                                                        <tr key={item.id}>
                                                            <th width="10%">{item.id}</th>
                                                            <th width="20%">{item.name}</th>
                                                            <th width="20%">{item.dateStart}</th>
                                                            <th width="20%">{item.dateEnd}</th>
                                                            <th width="40%">{item.scheduleId}</th>
                                                        </tr>
                                                    ))}
                                                </section>
                                            </tbody>
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

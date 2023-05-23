import React, { useState, useEffect } from 'react';
import styles from './ExpertPage.module.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../admin_farm/share/header/Header';
import './ExpertPage.css';
import { string } from 'yup';
import NewHeader from '../client_farm/share/newheader/NewHeader';
const parse = require('html-react-parser');

function ExpertPage() {
    const articleUrl = 'https://localhost:44303/api/Article';
    const scheduleUrl = 'https://localhost:44303/api/ScheduleTask';
    const ScheUrl = 'https://localhost:44303/api/Schedule';
    const standardUrl = 'https://localhost:44303/api/Standard';
    const stageDetailUrl = 'https://localhost:44303/api/StageDetail';

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [render, setRender] = useState(1); //1: Posts, 2: Schedule
    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);

    const [schedule, setSchedule] = useState([]);
    const [flag, setFlag] = useState(false);
    const [idHandle, setIdHandle] = useState(-1);

    const [postSearch, setPostSearch] = useState('');
    const [currentPosts, setCurrentPosts] = useState([]);
    const [standardSearch, setStandardSearch] = useState('');
    const [stageDetailSearch, setStageDetailSearch] = useState('');
    const [dataStorage, setDataStorage] = useState([]);
    useEffect(() => {
        setUser(currentUser.roleName);
        async function getData() {
            const Dataset = await axios.get(articleUrl);
            setCurrentPosts([]);

            Dataset.data.forEach((item) => {
                const value = {
                    id: item.id,
                    title: item.title,
                    datePost: item.datePost.slice(0, 10),
                    dateUpdate: item.dateUpdate,
                };
                setData((prevData) => [...prevData, value]);
                setCurrentPosts((prevData) => [...prevData, value]);
            });
        }

        async function getSchedule() {
            const res = await axios.get('https://localhost:44303/api/Schedule');
            const data = res.data;
            setSchedule(data);
        }

        getData();
        getSchedule();
    }, []);

    useEffect(() => {
        setCurrentPosts([...data]);
    }, [data]);

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
                    dateUpdate: item.dateUpdate?.slice(0, 10),
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
                    scheduleId: item.scheduleId,
                };
                // setData((prevData) => [...prevData, value]);
            });
        }

        getData();
    };

    const StandardHandler = () => {
        setRender(3);
        async function getData() {
            setData([]);
            const Dataset = await axios.get(standardUrl);

            Dataset.data.forEach((item) => {
                const value = {
                    id: item.id,
                    standardName: item.standardName,
                    minTemp: item.minTemp,
                    maxTemp: item.maxTemp,
                    minhumidity: item.minhumidity,
                    maxhumidity: item.maxhumidity,
                    wind: item.wind,
                    maxRain: item.maxRain,
                    season: item.season,
                };
                setData((prevData) => [...prevData, value]);
            });
        }
        getData();
        setDataStorage([...data]);
    };

    const StageDetailHandler = () => {
        setRender(4);
        async function getData() {
            setData([]);
            const Dataset = await axios.get(stageDetailUrl);

            Dataset.data.forEach((item) => {
                const value = {
                    id: item.id,
                    description: item.description,
                    stageId: item.stageId,
                    standardId: item.standardId,
                    convertedContent: parse(String(item.description)),
                    stageName: item.stageName,
                    standardName: item.standardName,
                };
                setData((prevData) => [...prevData, value]);
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

    // const [dataFil, setDataFil] = useState([]);
    const handleDeleteSchedule = () => {
        if (window.confirm('Xác nhận xoá!')) {
            const dataFil = [];
            axios
                .get(scheduleUrl)
                .then((res) => {
                    res.data.forEach((item) => {
                        if (item.scheduleId === idHandle) dataFil.push(item.id);
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
        }
    };

    const handleDeleteSD = (index) => {
        if (window.confirm('Xác nhận xoá!')) {
            async function deleteHandler() {
                await axios.delete(standardUrl + '/' + index);
                StandardHandler();
            }
            deleteHandler();
        }
    };

    const handleDeleteStageDetail = (index) => {
        if (window.confirm('Xác nhận xoá!')) {
            async function deleteHandler() {
                await axios.delete(stageDetailUrl + '/' + index);
                StageDetailHandler();
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

    const handleAddStandard = () => {
        navigate('/standardmanagement');
    };

    const handleAddStageDetail = () => {
        navigate('/stageDetailmanagement');
    };

    const handleEditPost = (id) => {
        navigate(`/editArticle/${id}`);
    };

    const handleEditSchedule = () => {
        navigate(`/editSchedule/${idHandle}`);
    };

    const handleEditSD = (id) => {
        navigate(`/standardmanagement/${id}`);
    };

    const handleEditStageDetail = (id) => {
        navigate(`/stageDetailmanagement/${id}`);
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

    const handleOnChangePostSearch = (e) => {
        setPostSearch(e.target.value);
    };
    const handleOnChangeStandardSearch = (e) => {
        setStandardSearch(e.target.value);
    };
    const handleOnChangeStageDetailSearch = (e) => {
        setStageDetailSearch(e.target.value);
    };

    useEffect(() => {
        if (postSearch !== '') {
            const resultArray = data.filter((item) => item.title.toLowerCase().includes(postSearch.toLowerCase()));
            setCurrentPosts([...resultArray]);
        } else if (postSearch === '') {
            setCurrentPosts([...data]);
        }
    }, [postSearch]);

    useEffect(() => {
        if (standardSearch !== '') {
            const resultArray = data.filter((item) =>
                item.standardName.toLowerCase().includes(standardSearch.toLowerCase()),
            );
            setCurrentPosts([...resultArray]);
        } else if (standardSearch === '') {
            setCurrentPosts([...data]);
        }
    }, [standardSearch]);

    useEffect(() => {
        if (stageDetailSearch !== '') {
            const resultArray = data.filter((item) =>
                item.standardName.toLowerCase().includes(stageDetailSearch.toLowerCase()),
            );
            setCurrentPosts([...resultArray]);
        } else if (stageDetailSearch === '') {
            setCurrentPosts([...data]);
        }
    }, [stageDetailSearch]);

    function truncateString(str) {
        if (str?.length > 40) {
            return str.slice(0, 40) + '...';
        } else {
            return str;
        }
    }

    function truncateString2(str) {
        if (str?.length > 5) {
            return str.slice(0, 5) + '...';
        } else {
            return str;
        }
    }

    return (
        <div>
            {user === 'Expert' && (
                <>
                    <NewHeader />
                    <div className={styles.body} style={{paddingTop:120}}>
                        <div className={styles.left}>
                            <h3 className={styles.title}>Expert Page</h3>
                                <div
                                    className={render === 1 ? styles.navItemSelected : styles.navItem}
                                    onClick={PostHandler}
                                >
                                    <i class="menuIconItem fa-regular fa-newspaper"></i>
                                    Posts
                                </div>
                                <div
                                    className={render === 2 ? styles.navItemSelected : styles.navItem}
                                    onClick={ScheduleHandler}
                                >
                                    <i class="menuIconItem fa-solid fa-calendar-days"></i>
                                    Schedules
                                </div>{' '}
                                <div
                                    className={render === 3 ? styles.navItemSelected : styles.navItem}
                                    onClick={StandardHandler}
                                >
                                    <i class="menuIconItem fa-solid fa-seedling"></i>
                                    Standard
                                </div>
                                <div
                                    className={render === 4 ? styles.navItemSelected : styles.navItem}
                                    onClick={StageDetailHandler}
                                >
                                    <i class="menuIconItem fa-solid fa-leaf"></i>
                                    Standard Detail
                                </div>
                        </div>
                        <div className={styles.right}>
                            <section className={styles.bodyContainer}>
                                <table className={styles.tableContainerr}>
                                    {render === 1 && (
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
                                            <section
                                                id="alskdj"
                                                className={styles.tableContent}
                                                style={{ marginTop: '-7px' }}
                                            >
                                                <tr>
                                                    <th className={styles.th1} width="10%">
                                                        <strong>Id</strong>
                                                    </th>
                                                    <th className={styles.th1} width="50%">
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
                                                    <th className={styles.th1}>
                                                        <strong>Sửa</strong>
                                                    </th>
                                                </tr>

                                                {currentPosts?.map((item) => (
                                                    <tr key={item.id}>
                                                        <th width="10%">{item.id}</th>
                                                        <th width="50%">{truncateString(item.title)}</th>
                                                        <th width="20%">{item.datePost}</th>
                                                        <th width="20%">{item.dateUpdate}</th>
                                                        <th
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleDeletePost(item.id)}
                                                        >
                                                            <i class="trashcan fa-solid fa-trash"></i>
                                                        </th>
                                                        <th
                                                            style={{ cursor: 'pointer', color: 'blue' }}
                                                            onClick={() => handleEditPost(item.id)}
                                                        >
                                                            <i class="fa-solid fa-pen-to-square"></i>
                                                        </th>
                                                    </tr>
                                                ))}
                                            </section>
                                            {/* </tbody> */}
                                        </div>
                                    )}

                                    {render === 2 && (
                                        <div>
                                            <div
                                                className={styles.searchContainer}
                                                style={{ marginBottom: '-30px', marginTop: '8px' }}
                                            >
                                                <button
                                                    id={styles.iconAddd}
                                                    onClick={handleAddSchedule}
                                                    style={{ height: '30px' }}
                                                >
                                                    Thêm
                                                </button>
                                                {flag && (
                                                    <button
                                                        id={styles.iconDelete}
                                                        onClick={handleDeleteSchedule}
                                                        style={{ height: '30px' }}
                                                    >
                                                        Xóa
                                                    </button>
                                                )}

                                                {flag && (
                                                    <button
                                                        id={styles.iconEdit}
                                                        onClick={() => handleEditSchedule()}
                                                        style={{ height: '30px' }}
                                                    >
                                                        Sửa
                                                    </button>
                                                )}
                                                <select
                                                    onChange={handlerChange}
                                                    className="selectInput"
                                                    style={{ paddingBottom: '1px' }}
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
                                                {/* <tbody> */}
                                            </div>

                                            <section className={styles.tableContent}>
                                                <tr>
                                                    <th className={styles.th1} width="10%">
                                                        <strong>Id</strong>
                                                    </th>
                                                    <th className={styles.th1} width="20%">
                                                        <strong>Tên</strong>
                                                    </th>
                                                    <th className={styles.th1} width="40%">
                                                        <strong>Bắt đầu</strong>
                                                    </th>
                                                    <th className={styles.th1} width="40%">
                                                        <strong>Kết thúc</strong>
                                                    </th>
                                                    <th className={styles.th1} width="30%">
                                                        <strong>Id lịch</strong>
                                                    </th>
                                                </tr>
                                                {data.map((item) => (
                                                    <tr key={item.id}>
                                                        <th width="10%">{item.id}</th>
                                                        <th width="20%">{item.name}</th>
                                                        <th width="30%">{item.dateStart}</th>
                                                        <th width="30%">{item.dateEnd}</th>
                                                        <th width="10%">{truncateString2(item.scheduleId)}</th>
                                                    </tr>
                                                ))}
                                            </section>
                                            {/* </tbody> */}
                                        </div>
                                    )}

                                    {render === 3 && (
                                        <div>
                                            {/* <tbody> */}
                                            <div className={styles.searchContainer}>
                                                <button id={styles.iconAdd} onClick={handleAddStandard}>
                                                    Thêm
                                                </button>
                                                <input
                                                    type="text"
                                                    className={styles.searchBar}
                                                    autoComplete="none"
                                                    onChange={handleOnChangeStandardSearch}
                                                ></input>
                                            </div>
                                            <section
                                                id="alskdjj"
                                                className={styles.tableContent}
                                                style={{ marginTop: '-7px' }}
                                            >
                                                <tr>
                                                    <th className={styles.th1} width="50%">
                                                        <strong>Tên </strong>
                                                    </th>
                                                    <th className={styles.th1} width="20%">
                                                        <strong>Nhiệt cao nhất</strong>
                                                    </th>
                                                    <th className={styles.th1} width="20%">
                                                        <strong>Nhiệt thấp nhất</strong>
                                                    </th>
                                                    <th className={styles.th1}>
                                                        <strong>Độ ẩm tối đa</strong>
                                                    </th>
                                                    <th className={styles.th1}>
                                                        <strong>Độ ẩm tối thiểu</strong>
                                                    </th>{' '}
                                                    <th className={styles.th1}>
                                                        <strong>Sức gió</strong>
                                                    </th>{' '}
                                                    <th className={styles.th1}>
                                                        <strong>Lượng mưa</strong>
                                                    </th>
                                                    <th className={styles.th1}>
                                                        <strong>Tháng</strong>
                                                    </th>
                                                    <th className={styles.th1}>
                                                        <strong>Xoá</strong>
                                                    </th>{' '}
                                                    <th className={styles.th1}>
                                                        <strong>Sửa</strong>
                                                    </th>
                                                </tr>

                                                {currentPosts?.map((item) => (
                                                    <tr key={item.id}>
                                                        <th width="10%">{item.standardName}</th>
                                                        <th width="10%">{item.maxTemp}</th>
                                                        <th width="10%">{item.minTemp}</th>
                                                        <th width="10%">{item.maxhumidity}</th>
                                                        <th width="10%">{item.minhumidity}</th>
                                                        <th width="10%">{item.wind}</th>
                                                        <th width="10%">{item.maxRain}</th>
                                                        <th width="20%">{item.season}</th>
                                                        <th
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleDeleteSD(item.id)}
                                                        >
                                                            <i class="trashcan fa-solid fa-trash"></i>
                                                        </th>
                                                        <th
                                                            style={{ cursor: 'pointer', color: 'blue' }}
                                                            onClick={() => handleEditSD(item.id)}
                                                        >
                                                            <i class="fa-solid fa-pen-to-square"></i>
                                                        </th>
                                                    </tr>
                                                ))}
                                            </section>
                                            {/* </tbody> */}
                                        </div>
                                    )}

                                    {render === 4 && (
                                        <div>
                                            {/* <tbody> */}
                                            <div className={styles.searchContainer}>
                                                <button id={styles.iconAdd} onClick={handleAddStageDetail}>
                                                    Thêm
                                                </button>
                                                <input
                                                    type="text"
                                                    className={styles.searchBar}
                                                    autoComplete="none"
                                                    onChange={handleOnChangeStageDetailSearch}
                                                ></input>
                                            </div>
                                            <section
                                                id="alskdjjj"
                                                className={styles.tableContent}
                                                style={{ marginTop: '-7px' }}
                                            >
                                                <tr>
                                                    <th className={styles.th1} width="20%">
                                                        <strong>Tên cây trồng </strong>
                                                    </th>
                                                    <th className={styles.th1} width="20%">
                                                        <strong>Tên giai đoạn</strong>
                                                    </th>
                                                    <th className={styles.th1} width="50%">
                                                        <strong>Nội dung</strong>
                                                    </th>
                                                    <th className={styles.th1} width="10%">
                                                        <strong>Xoá</strong>
                                                    </th>{' '}
                                                    <th className={styles.th1} width="10%">
                                                        <strong>Sửa</strong>
                                                    </th>
                                                </tr>

                                                {currentPosts?.map((item) => (
                                                    <tr key={item.id}>
                                                        <th width="20%">{item.standardName}</th>
                                                        <th width="20%">{item.stageName}</th>
                                                        <th width="50%" style={{ textAlign: 'left' }}>
                                                            {item.convertedContent}
                                                        </th>
                                                        <th
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleDeleteStageDetail(item.id)}
                                                            width="10%"
                                                        >
                                                            <i class="trashcan fa-solid fa-trash"></i>
                                                        </th>
                                                        <th
                                                            style={{ cursor: 'pointer', color: 'blue' }}
                                                            onClick={() => handleEditStageDetail(item.id)}
                                                            width="10%"
                                                        >
                                                            <i class="fa-solid fa-pen-to-square"></i>
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

            {user === 'Admin' && navigate('/AdminHome')}
            {user === 'Farmer' && navigate('/')}
        </div>
    );
}

export default ExpertPage;

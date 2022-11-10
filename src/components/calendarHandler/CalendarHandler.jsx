import React, { useRef, useState } from 'react';
import styles from './CalendarHandler.module.css';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useEffect } from 'react';
import Header from '../admin_farm/share/header/Header';
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';

const url = 'https://localhost:44303/api/ScheduleTask';
const url2 = 'https://localhost:44303/api/Schedule';

function CalendarHandler() {
    const { id } = useParams();
    const idSchedule = id;
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [category, setCategory] = useState(1);
    const [title, setTitle] = useState('');
    const [scheduleIdcombo, setScheduledIdCombo] = useState([]);
    const [scheduleName, setScheduledName] = useState([]);
    const [currentContent, setCurrentContent] = useState('');
    const urlEdit = 'https://localhost:44303/api/ScheduleTask';
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    useEffect(() => {
        setUser(currentUser.roleName);
        axios.get(url2).then((response) => {
            const data = response.data;
            data.forEach((item) => {
                setScheduledIdCombo((prevStateId) => [...prevStateId, item.id]);
                setScheduledName((prevStateName) => [...prevStateName, item.name]);
            });
        });
    }, []);

    const fillCurrentDataSchedule = async () => {
        const url = `https://localhost:44303/api/ScheduleTask/${idSchedule}`;
        const res = await axios.get(url);
        const response = res.data;
        setStart(response.dateStart.slice(0, 10));
        setEnd(response.dateEnd.slice(0, 10));
        setTitle(response.name);
        setCategory(response.scheduleId);
        setCurrentContent(response.description);
    };

    useEffect(() => {
        if (idSchedule) {
            fillCurrentDataSchedule();
        }
    }, []);

    function getText(html) {
        var divContainer = document.createElement('div');
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || '';
    }

    const onClickHandler = async () => {
        let scheduleNew = {};
        if (idSchedule) {
            scheduleNew = {
                id: idSchedule,
                dateStart: new Date(start).toISOString(),
                dateEnd: new Date(end).toISOString(),
                scheduleId: category,
                description: currentContent,
                name: title,
            };
        } else {
            scheduleNew = {
                dateStart: new Date(start).toISOString(),
                dateEnd: new Date(end).toISOString(),
                scheduleId: category,
                description: currentContent,
                name: title,
            };
        }
        try {
            if (idSchedule) {
                await axios.put(urlEdit + `/${idSchedule}`, scheduleNew);
            } else {
                await axios.post(url, scheduleNew);
            }
            alert('Đăng thành công!');
            navigate('/calenderhandler');
            window.location.reload();
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    };

    return (
        <div>
            {(user === 'Expert' || user === 'Admin') && (
                <>
                    <Header />
                    <div className={styles.container}>
                        <div className={styles.label}>Tạo lịch thời vụ</div>
                        <div className={styles.textContainer}>
                            <p>Tiêu đề</p>
                            <input
                                placeholder="Nhập tên thời vụ..."
                                className={styles.input}
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                type="text"
                                required
                                min={3}
                            ></input>

                            <div className={styles.comboboxContainer} lang="vi">
                                <div>
                                    <p>Bắt đầu</p>
                                    <input
                                        type="date"
                                        id="start"
                                        className={styles.combobox}
                                        onChange={(e) => setStart(e.target.value)}
                                        value={start}
                                        lang="vi"
                                    ></input>
                                </div>

                                <div>
                                    <p>Kết thúc</p>
                                    <input
                                        type="date"
                                        id="start"
                                        className={styles.combobox}
                                        onChange={(e) => setEnd(e.target.value)}
                                        value={end}
                                    ></input>
                                </div>
                                <div>
                                    <p>Loại sản phẩm</p>
                                    <select
                                        name="category"
                                        id="category"
                                        className={styles.cateBox}
                                        onChange={(e) => setCategory(Number(e.target.value))}
                                        value={category}
                                    >
                                        {scheduleIdcombo.map((item, index) => (
                                            <option value={item} key={index}>
                                                {scheduleName[index]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="button" onClick={onClickHandler} className={styles.button}>
                                    Đăng
                                </button>
                            </div>
                            <div>
                                <textarea
                                    placeholder="Mô tả..."
                                    className={styles.textBox}
                                    required
                                    onChange={(e) => setCurrentContent(e.target.value)}
                                    value={currentContent}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {!(user === 'Expert' || user === 'Admin') && navigate('/')}
        </div>
    );
}

export default CalendarHandler;

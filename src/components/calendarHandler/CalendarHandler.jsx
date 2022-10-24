import React, { useRef, useState } from 'react';
import styles from './CalendarHandler.module.css';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useEffect } from 'react';
import Header from '../admin_farm/share/header/Header';

const url = 'https://localhost:44303/api/ScheduleTask';
const url2 = 'https://localhost:44303/api/Schedule';

function CalendarHandler() {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [category, setCategory] = useState(1);
    const [title, setTitle] = useState('');
    const [scheduleIdcombo, setScheduledIdCombo] = useState([]);
    const [scheduleName, setScheduledName] = useState([]);
    useEffect(() => {
        axios.get(url2).then((response) => {
            const data = response.data;
            data.forEach((item) => {
                setScheduledIdCombo((prevStateId) => [...prevStateId, item.id]);
                setScheduledName((prevStateName) => [...prevStateName, item.name]);
            });
        });
    }, []);

    function getText(html) {
        var divContainer = document.createElement('div');
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || '';
    }

    const editorRef = useRef();
    const onClickHandler = async () => {
        const scheduleNew = {
            dateStart: new Date(start).toISOString(),
            dateEnd: new Date(end).toISOString(),
            scheduleId: category,
            description: getText(editorRef.current.getContent()),
            name: title,
        };
        console.log(scheduleNew);
        try {
            const a = await axios.post(url, scheduleNew);
            alert('Đăng thành công!');
            window.location.reload();
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.label}>Tạo lịch thời vụ</div>
                <div className={styles.textContainer}>
                    <p>Tiêu đề</p>
                    <input
                        placeholder="Nhập tiêu đề..."
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
                    <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        init={{
                            plugins: ['image', 'code', 'table', 'link', 'media', 'codesample'],
                            toolbar: '',
                            menubar: false,
                            branding: false,
                            init_instance_callback: function (editor) {
                                var freeTiny = document.querySelector('.tox .tox-notification--in');
                                freeTiny.style.display = 'none';
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default CalendarHandler;

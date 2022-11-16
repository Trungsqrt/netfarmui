import React, { useState, useEffect } from 'react';
import styles from './Personal.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../client_farm/share/header/Header';
import axios from 'axios';
function Personal() {
    const [fullName, setFullName] = useState('');
    const [uname, setUname] = useState('');
    const [mail, setMail] = useState('');
    const [cccd, setCccd] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [gender, setGender] = useState(true);
    const [createAt, setCreateAt] = useState('');

    const navigate = useNavigate();

    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const getUserByIdUrl = `https://localhost:44303/api/Users/${userId}`;

    useEffect(() => {
        const fillCurrentInfo = async () => {
            let currentUserInfo = await axios.get(getUserByIdUrl);
            currentUserInfo = currentUserInfo.data;
            setFullName(currentUserInfo.fullName);
            setGender(currentUserInfo.gender);
            setCccd(currentUserInfo.identifyCard);
            setMail(currentUserInfo.email);
            const dob = currentUserInfo.dayOfBirth.slice(0, 10).split('-');
            setYear(dob[0]);
            setMonth(dob[1]);
            setDay(dob[2]);
            setCreateAt(currentUserInfo.createAt);
            setUname(currentUserInfo.phone);
        };
        fillCurrentInfo();
    }, []);

    const newUserInfo = {
        id: JSON.parse(localStorage.getItem('user')).userId,
        fullName: fullName,
        phone: uname,
        email: mail,
        dayOfBirth: new Date(Number(year), Number(month) - 1, Number(day) + 1).toISOString(),
        gender: gender,
        identifyCard: cccd,
        createAt: createAt,
        updateAt: new Date().toISOString(),
    };

    const updateHandler = async () => {
        const res = await axios.put(getUserByIdUrl, newUserInfo);
        console.log(res);
    };

    const submitHandler = () => {
        updateHandler();
        alert('Cập nhật thành công!');
        window.location.reload();
    };

    return (
        <div>
            <Header />
            <div className={styles.body}>
                <div className={styles.container}>
                    <section className={styles.title}>Cập nhật thông tin cá nhân</section>
                    <section className={styles.bodyContainer}>
                        <section>
                            <section className={styles.formContainer}>
                                <form className={styles.inputContainer}>
                                    <section className={styles.inputForm}>
                                        <section>
                                            {/* NOTE: name */}
                                            <div className={(styles.name, styles.formElement)}>
                                                <p className={styles.titleContent}>Họ và tên</p>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    placeholder="Họ lót"
                                                    className={(styles.inputField, styles.nameField)}
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                />
                                            </div>

                                            {/* NOTE: sdt */}
                                            <div className={(styles.name, styles.formElement)}>
                                                <p className={styles.titleContent}>Số điện thoại</p>
                                                <input
                                                    type="number"
                                                    name="uname"
                                                    id="uname"
                                                    onChange={(e) => setUname(e.target.value)}
                                                    placeholder="Số điện thoại"
                                                    className={styles.inputField}
                                                    value={uname}
                                                    readOnly
                                                />
                                            </div>

                                            {/* NOTE: email */}
                                            <div className={(styles.name, styles.formElement)}>
                                                <p className={styles.titleContent}>Email</p>
                                                <input
                                                    type="mail"
                                                    name="mail"
                                                    id="mail"
                                                    onChange={(e) => setMail(e.target.value)}
                                                    placeholder="Email"
                                                    className={styles.inputField}
                                                    value={mail}
                                                />
                                            </div>
                                            {/* NOTE: CCCD */}
                                            <div className={(styles.name, styles.formElement)}>
                                                <p className={styles.titleContent}>CCCD</p>
                                                <input
                                                    type="number"
                                                    name="cccd"
                                                    id="cccd"
                                                    onChange={(e) => setCccd(e.target.value)}
                                                    placeholder="CCCD"
                                                    className={styles.inputField}
                                                    value={cccd}
                                                />
                                            </div>
                                            {/* NOTE: ngay thang nam sinh */}
                                            <div className={(styles.name, styles.formElement)}>
                                                <p className={styles.titleContent}>Ngày sinh</p>
                                                <input
                                                    type="number"
                                                    name="day"
                                                    value={day}
                                                    onChange={(e) => setDay(e.target.value)}
                                                    placeholder="Ngày sinh"
                                                    className={styles.inputField}
                                                />
                                                <input
                                                    type="number"
                                                    name="month"
                                                    value={month}
                                                    onChange={(e) => setMonth(e.target.value)}
                                                    placeholder="Tháng sinh"
                                                    className={styles.inputField}
                                                />

                                                <input
                                                    type="number"
                                                    name="year"
                                                    value={year}
                                                    onChange={(e) => setYear(e.target.value)}
                                                    placeholder="Năm sinh"
                                                    className={styles.inputField}
                                                />
                                            </div>

                                            {/* NOTE: gioi tinh */}
                                            <div className={(styles.name, styles.formElement)}>
                                                <p className={styles.titleContent}>Giới tính</p>
                                                <section className={styles.formGender}>
                                                    {/* NOTE: nam */}
                                                    <section className={styles.radioBtn}>
                                                        <label>Nam</label>
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="male"
                                                            onChange={(e) => setGender(true)}
                                                            defaultChecked
                                                        />
                                                    </section>

                                                    {/* NOTE: nu */}
                                                    <section className={styles.radioBtn}>
                                                        <label>Nữ</label>
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="female"
                                                            onChange={(e) => setGender(false)}
                                                        />
                                                    </section>
                                                </section>
                                            </div>
                                        </section>
                                    </section>

                                    <section className={styles.btnSub}>
                                        <input
                                            type="submit"
                                            className={styles.btnSubmit}
                                            value="Xác nhận"
                                            onClick={submitHandler}
                                        />
                                    </section>
                                </form>
                            </section>
                        </section>
                    </section>
                    <section className={styles.backButton}>
                        <button
                            className={styles.back}
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Trở lại
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Personal;

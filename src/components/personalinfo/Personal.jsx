import React, { useState, useEffect } from 'react';
import styles from './Personal.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../client_farm/share/header/Header';
import { default as StaffHeader } from '../admin_farm/share/header/Header';
import { default as FarmerHeader } from '../client_farm/share/header/Header';
import axios from 'axios';

import isEmpty from 'validator/lib/isEmpty';
import validator from 'validator';

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

    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const [user, setUser] = useState(currentUser.roleName);

    const navigate = useNavigate();

    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const getUserByIdUrl = `https://localhost:44303/api/Users/${userId}`;

    const [validationMsg, setValidationMsg] = useState({});

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

    const submitHandler = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;
        updateHandler();
        alert('C???p nh???t th??nh c??ng!');
        window.location.reload();
    };

    const validateAll = () => {
        const msg = {};
        if (isEmpty(uname)) {
            msg.uname = 'H??y nh???p s??? ??i???n tho???i!';
        }
        if (isEmpty(fullName.trim())) {
            msg.fullName = 'H??y nh???p h??? v?? t??n!';
        }
        if (isEmpty(cccd)) {
            msg.cccd = 'H??y nh???p s??? CCCD!';
        }
        if (isEmpty(day)) {
            msg.day = 'H??y nh???p ng??y sinh!';
        }
        if (isEmpty(month)) {
            msg.month = 'H??y nh???p th??ng sinh!';
        }
        if (isEmpty(year)) {
            msg.year = 'H??y nh???p n??m sinh!';
        } else if (validator.isMobilePhone(uname, 'vi-VN')) {
        } else {
            msg.uname = 'Vui l??ng nh???p ????ng ?????nh d???ng s??? ??i???n tho???i!';
        }
        if (cccd[0] == '0') {
            msg.cccd = 'CCCD kh??ng b???t ?????u b???ng 0';
        }
        if (cccd.length < 8) {
            msg.cccd = 'CCCD ph???i ????? 8 s???';
        }

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };

    return (
        <div>
            {(user === 'Admin' || user === 'Expert') && <StaffHeader />}
            {!(user === 'Admin' || user === 'Expert') && <FarmerHeader />}
            <div className={styles.body}>
                <div className={styles.container}>
                    <section className={styles.title}>C???p nh???t th??ng tin c?? nh??n</section>
                    <section className={styles.bodyContainer}>
                        <section>
                            <section className={styles.formContainer}>
                                <form className={styles.inputContainer}>
                                    <section className={styles.inputForm}>
                                        <section>
                                            {/* NOTE: name */}
                                            <p className={styles.error}>{validationMsg.fullName}</p>
                                            <div className={(styles.name, styles.formElement)}>
                                                <p className={styles.titleContent}>H??? v?? t??n</p>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    placeholder="H??? v?? t??n"
                                                    className={(styles.inputField, styles.nameField)}
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    autoComplete="none"
                                                />
                                            </div>

                                            {/* NOTE: sdt */}
                                            <div className={(styles.name, styles.formElement)}>
                                                <p className={styles.titleContent}>S??? ??i???n tho???i</p>
                                                <input
                                                    type="number"
                                                    name="uname"
                                                    id="uname"
                                                    onChange={(e) => setUname(e.target.value)}
                                                    placeholder="S??? ??i???n tho???i"
                                                    className={styles.inputField}
                                                    value={uname}
                                                    readOnly
                                                    style={{ backgroundColor: '#C5C5C5' }}
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
                                                    autoComplete="none"
                                                />
                                            </div>
                                            {/* NOTE: CCCD */}
                                            <p className={styles.error}>{validationMsg.cccd}</p>
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
                                                    autoComplete="none"
                                                />
                                            </div>
                                            {/* NOTE: ngay thang nam sinh */}
                                            <p className={styles.error}>{validationMsg.day}</p>
                                            <p className={styles.error}>{validationMsg.month}</p>
                                            <p className={styles.error}>{validationMsg.year}</p>
                                            <div className={(styles.name, styles.formElement)}>
                                                <p className={styles.titleContent}>Ng??y sinh</p>
                                                <input
                                                    type="number"
                                                    name="day"
                                                    value={day}
                                                    onChange={(e) => setDay(e.target.value)}
                                                    placeholder="Ng??y sinh"
                                                    className={styles.inputField}
                                                    autoComplete="none"
                                                />
                                                <input
                                                    type="number"
                                                    name="month"
                                                    value={month}
                                                    onChange={(e) => setMonth(e.target.value)}
                                                    placeholder="Th??ng sinh"
                                                    className={styles.inputField}
                                                    autoComplete="none"
                                                />

                                                <input
                                                    type="number"
                                                    name="year"
                                                    value={year}
                                                    onChange={(e) => setYear(e.target.value)}
                                                    placeholder="N??m sinh"
                                                    className={styles.inputField}
                                                    autoComplete="none"
                                                />
                                            </div>

                                            {/* NOTE: gioi tinh */}
                                            <div className={(styles.name, styles.formElement)}>
                                                <p className={styles.titleContent}>Gi???i t??nh</p>
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
                                                            autoComplete="none"
                                                        />
                                                    </section>

                                                    {/* NOTE: nu */}
                                                    <section className={styles.radioBtn}>
                                                        <label>N???</label>
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="female"
                                                            onChange={(e) => setGender(false)}
                                                            autoComplete="none"
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
                                            value="X??c nh???n"
                                            onClick={submitHandler}
                                            autoComplete="none"
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
                            Tr??? l???i
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Personal;

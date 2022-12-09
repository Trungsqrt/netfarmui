import React from 'react';
import styles from './ChangePassword.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { default as StaffHeader } from '../admin_farm/share/';
import { default as FarmerHeader } from '../client_farm/share/header/Header';
function ChangePassword() {
    const [validationMsg, setValidationMsg] = useState({});
    const navigate = useNavigate();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');
    const [repass, setRepass] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [gender, setGender] = useState(true);

    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);

    useEffect(() => {
        setUser(currentUser.roleName);
    }, []);
    const validateAll = () => {
        const msg = {};
        if (isEmpty(fname)) {
            msg.fname = 'Hãy nhập họ và tên lót!';
        }
        if (isEmpty(lname)) {
            msg.lname = 'Hãy nhập tên!';
        }
        if (isEmpty(uname)) {
            msg.uname = 'Hãy nhập số điện thoại!';
        }
        if (isEmpty(pass)) {
            msg.pass = 'Hãy nhập mật khẩu!';
        }
        if (isEmpty(repass)) {
            msg.repass = 'Hãy xác nhận mật khẩu';
        }

        if (equals(pass, repass) === false) {
            msg.repass = 'Hãy xác nhận đúng mật khẩu';
        }

        if (isEmpty(day)) {
            msg.day = 'Hãy nhập ngày sinh';
        }
        if (isEmpty(month)) {
            msg.month = 'Hãy nhập tháng sinh';
        }
        if (isEmpty(year)) {
            msg.year = 'Hãy nhập năm sinh';
        }

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;
        const dob = new Date(Number(year), Number(month) - 1, Number(day) + 1).toISOString();

        const newUser = {
            fullName: fname + ' ' + lname,
            phone: uname,
            passWord: pass,
            gender: gender,
            dayOfBirth: dob,
            identifyCard: Math.floor(Math.random() * (9999 - 5 + 1) + 5).toString(),
            roleId: 2,
        };
    };

    return (
        <div>
            <>
                <div className={styles.container}>
                    <section className={styles.registerContainer}>
                        <div className={styles.registerContainer2}>
                            <div className={styles.label}>
                                <h5 className={styles.title}>Đổi mật khẩu</h5>
                            </div>
                            <form className={styles.form} autoComplete="off">
                                <section className={styles.error2}>
                                    {/* Chinh lai 1 ti thanh xac nhat pass cu~ */}
                                    <p className={styles.error}>{validationMsg.uname}</p>
                                </section>
                                <section className={styles.formContainer}>
                                    <input
                                        type="password"
                                        name="uname"
                                        id="uname"
                                        onChange={(e) => setUname(e.target.value)}
                                        placeholder="Nhập mật khẩu cũ"
                                        className={styles.inputField}
                                        value={uname}
                                    />
                                </section>

                                <section className={styles.error2}>
                                    <p className={styles.error}>{validationMsg.pass}</p>
                                </section>
                                <section className={styles.formContainer}>
                                    <input
                                        type="password"
                                        name="pass"
                                        placeholder="Mật khẩu"
                                        className={styles.inputField}
                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                </section>
                                <section className={styles.error2}>
                                    <p className={styles.error}>{validationMsg.repass}</p>
                                </section>
                                <section className={styles.formContainer}>
                                    <input
                                        type="password"
                                        name="repass"
                                        placeholder="Xác nhận mật khẩu"
                                        className={styles.inputField}
                                        value={repass}
                                        onChange={(e) => setRepass(e.target.value)}
                                    />
                                </section>
                                <section className={styles.formContainer}>
                                    <input
                                        type="submit"
                                        className={styles.btnSubmit}
                                        value="Xác nhận"
                                        onClick={handleSubmit}
                                    />
                                </section>
                            </form>
                        </div>
                    </section>
                </div>
            </>
        </div>
    );
}

export default ChangePassword;

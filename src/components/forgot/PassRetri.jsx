import React from 'react';
import styles from './PassRetri.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { default as StaffHeader } from '../admin_farm/share/header/Header';
import { default as FarmerHeader } from '../client_farm/share/header/Header';
import axios from 'axios';
function PassRetri() {
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
    const [userid, setUserid] = useState('');
    const urlPhone = 'https://localhost:44303/api/ForgotPass?phone=';
    const urlPhoneConfirm = 'https://localhost:44303/api/ForgotPass';
    const [code, setCode] = useState('');
    const [flag, setFlag] = useState(false);
    const [confirmCode, setConfirmCode] = useState('');

    const validateAll = () => {
        const msg = {};
        if (isEmpty(uname)) {
            msg.uname = 'Hãy nhập mật khẩu cũ!';
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
        if (isEmpty(code)) {
            msg.code = 'Hãy nhập mã xác nhận!';
        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (flag) {
            const isValid = validateAll();
            if (!isValid) return;

            if (confirmCode == code) {
                const currentU = {
                    nameOrPhone: uname,
                    newPass: pass,
                    confirm: repass,
                };
                const handle = async () => {
                    const res = await axios.put(urlPhoneConfirm, currentU);
                    const response = res.data;
                    if (response.status == true) {
                        alert('Đổi mật khẩu thành công!');
                        navigate('/login');
                    } else {
                        alert('Có lỗi xảy ra, xin vui lòng thử lại!');
                    }
                };
                handle();
            } else {
                alert('Mã xác nhận không đúng!');
            }
        }
    };

    const handleGetCode = (e) => {
        e.preventDefault();
        const handle = async () => {
            const res = await axios.get(urlPhone + uname);
            const response = res.data;
            console.log('res: ' + response);
            console.log('code: ' + response.code);
            if (response.messStatus == true) {
                setCode(response.code);
                console.log(code);
                setFlag(true);
            } else {
                alert('Có lỗi xảy ra, vui lòng kiểm tra số điện thoại của bạn');
            }
        };
        handle();
    };

    return (
        <div>
            <>
                <div className={styles.container}>
                    <section className={styles.registerContainer}>
                        <div className={styles.registerContainer2}>
                            <div className={styles.label}>
                                <h5 className={styles.title}>Đặt lại mật khẩu</h5>
                            </div>
                            <form className={styles.form} autoComplete="off">
                                <section className={styles.error2}>
                                    {/* Chinh lai 1 ti thanh xac nhat pass cu~ */}
                                    <p className={styles.error}>{validationMsg.uname}</p>
                                </section>
                                <section className={styles.formContainer}>
                                    <input
                                        type="number"
                                        name="uname"
                                        id="uname"
                                        onChange={(e) => setUname(e.target.value)}
                                        placeholder="Nhập số điện thoại"
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
                                        placeholder="Mật khẩu mới"
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

                                <section className={styles.error2}>
                                    <p className={styles.error}>{validationMsg.code}</p>
                                </section>
                                <section className={styles.formContainer}>
                                    <input
                                        type="text"
                                        name="code"
                                        placeholder="Nhập mã xác nhận"
                                        className={
                                            flag ? `${styles.inputField}` : `${styles.inputField} ${styles.readonly}`
                                        }
                                        value={confirmCode}
                                        onChange={(e) => setConfirmCode(e.target.value)}
                                        readOnly={flag ? false : true}
                                    />
                                </section>

                                <section className={styles.formContainer}>
                                    <input
                                        type="button"
                                        name="phone"
                                        value="Nhận mã xác nhận"
                                        className={styles.btnSubmit}
                                        onClick={handleGetCode}
                                    />
                                    <input
                                        type="submit"
                                        className={
                                            flag ? `${styles.btnSubmit}` : `${styles.btnSubmit} ${styles.btnReadOnly}`
                                        }
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

export default PassRetri;

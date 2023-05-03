import React, { useState } from 'react';
import styles from '../forgot/Forgot.module.css';
import './Forgot.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Forgot() {
    const navigate = useNavigate();
    const [mess, setMess] = useState('');
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [confirmCode, setConfirmCode] = useState('');
    const [flag, setFlag] = useState(false);

    const urlPhone = 'https://localhost:44303/api/ForgotPass?phone=';

    const handleGetCode = (e) => {
        e.preventDefault();
        const handle = async () => {
            const res = await axios.get(urlPhone + phone);
            console.log('abc');
            const response = res.data;
            console.log('res: ' + response);
            console.log('code: ' + response.code);
            if (response.messStatus === true) {
                setCode(response.code);
                console.log(code);
                setFlag(true);
            } else {
                alert('Có lỗi xảy ra, vui lòng kiểm tra số điện thoại của bạn');
            }
        };
        handle();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (confirmCode === code) {
            localStorage.setItem('recoverPass', phone);
            navigate('/passwordRetrieval');
        } else {
            alert('Mã xác nhận không đúng!');
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.overlay}>
                    <div className={styles.modal}>
                        <span className={styles.iconCross}>&times;</span>
                        <div className={styles.formBody}>
                            <section className={styles.label}>
                                <h5 className={styles.title}>Quên mật khẩu</h5>
                                <p className={styles.titleDesc}>Nhập thông tin tài khoản</p>
                            </section>
                            <section className={styles.formContainer}>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    {/* usn */}
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="number"
                                            name="phone"
                                            placeholder="Nhập số điện thoại"
                                            className={styles.inputField}
                                            autoComplete="none"
                                            id="forgot"
                                            onInvalid={(e) => e.target.setCustomValidity('Vui lòng không để trống')}
                                            onInput={(e) => e.target.setCustomValidity('')}
                                            onChange={(e) => setPhone(e.target.value)}
                                            value={phone}
                                        />
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            name="code"
                                            placeholder="Nhập mã xác nhận"
                                            className={
                                                flag
                                                    ? `${styles.inputField}`
                                                    : `${styles.inputField} ${styles.readonly}`
                                            }
                                            autoComplete="none"
                                            onInvalid={(e) => e.target.setCustomValidity('Vui lòng không để trống')}
                                            onInput={(e) => e.target.setCustomValidity('')}
                                            onChange={(e) => setConfirmCode(e.target.value)}
                                            value={confirmCode}
                                            readOnly={flag ? false : true}
                                        />
                                    </div>
                                    {/* btn */}
                                    <div className={styles.btnSubmitContainer}>
                                        <input
                                            type="button"
                                            name="phone"
                                            value="Nhận mã xác nhận"
                                            className={styles.btnSubmit}
                                            onClick={handleGetCode}
                                        />
                                        <input
                                            type="button"
                                            name="code"
                                            value="Xác nhận"
                                            className={
                                                flag
                                                    ? `${styles.btnSubmit}`
                                                    : `${styles.btnSubmit} ${styles.btnReadOnly}`
                                            }
                                            onClick={handleSubmit}
                                        />
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forgot;

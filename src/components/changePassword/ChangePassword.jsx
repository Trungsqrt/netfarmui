import React from 'react';
import styles from './ChangePassword.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import axios from 'axios';
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
    const [userid, setUserid] = useState('');
    const changePassUrl = 'https://localhost:44303/api/ChangePass/';

    useEffect(() => {
        if (getUser === null) {
            navigate('/');
        } else {
            setUser(currentUser.roleName);
            setUserid(currentUser.userId);
        }
    }, []);

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
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;

        const currentU = {
            currentPassword: uname,
            newPassword: pass,
            confirmPassword: pass,
        };

        const handle = async () => {
            const res = await axios.put(changePassUrl + userid, currentU);
            const response = res.data;
            if (response.message === 'Your current password is wong!') {
                alert('Mật khẩu hiện tại không đúng, vui lòng nhập lại!');
            } else if (uname == pass) {
                alert('Mật khẩu mới phải khác mật khẩu hiện tại');
            } else if (response.status == true) {
                alert('Thay đổi mật khẩu thành công!');
                if (user == 'Admin' || user == 'Expert') {
                    navigate('/adminHome');
                } else {
                    navigate('/');
                }
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

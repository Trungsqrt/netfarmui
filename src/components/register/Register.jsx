//#region import
import { useState } from 'react';
import styles from '../register/Register.module.css';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { registerUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
//#endregion

function Register({ setOverlay }) {
    const close = () => {
        setOverlay(false);
    };
    //register info
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');
    const [repass, setRepass] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [gender, setGender] = useState(true);
    const [accept, setAccept] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // #region validate
    const [validationMsg, setValidationMsg] = useState({});

    const handleChange = (e) => {
        const checked = e.target.checked;
        if (checked) setAccept('true');
        else setAccept('');
    };

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
        if (isEmpty(accept)) {
            msg.accept = 'Hãy đồng ý với điều khoản!';
        } else if (validator.isMobilePhone(uname, 'vi-VN')) {
        } else {
            msg.uname = 'Vui lòng nhập đúng định dạng số điện thoại!';
        }

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };
    //#endregion

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
            roleId: 3,
        };
        registerUser(newUser, dispatch, navigate);
    };
    return (
        <div>
            <div className={styles.overlay}>
                <section className={styles.registerContainer}>
                    <div className={styles.registerContainer2}>
                        <span className={styles.iconCross} onClick={close}>
                            &times;
                        </span>
                        <div className={styles.label}>
                            <h5 className={styles.title}>Đăng ký</h5>
                            <p className={styles.titleDesc}>Nhập thông tin đăng ký</p>
                        </div>
                        <form className={styles.form} autoComplete="off">
                            <section className={styles.error2}>
                                <p className={styles.error}>{validationMsg.fname}</p>
                                <p className={styles.error}>{validationMsg.lname}</p>
                            </section>
                            <section className={styles.formContainer}>
                                <input
                                    type="text"
                                    name="fname"
                                    placeholder="Họ lót"
                                    className={(styles.inputField, styles.nameField)}
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                />
                                <input
                                    type="text"
                                    name="lname"
                                    placeholder="Tên"
                                    className={(styles.inputField, styles.nameField)}
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                />
                            </section>

                            <section className={styles.error2}>
                                <p className={styles.error}>{validationMsg.uname}</p>
                            </section>
                            <section className={styles.formContainer}>
                                <input
                                    type="number"
                                    name="uname"
                                    id="uname"
                                    onChange={(e) => setUname(e.target.value)}
                                    placeholder="Số điện thoại"
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

                            <section className={styles.error2}>
                                <p className={styles.error}>{validationMsg.day}</p>
                                <p className={styles.error}>{validationMsg.month}</p>
                                <p className={styles.error}>{validationMsg.year}</p>
                            </section>
                            <section className={styles.formContainer}>
                                <input
                                    type="number"
                                    name="day"
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    placeholder="Ngày sinh"
                                    className={styles.inputField}
                                    min="1"
                                    max="31"
                                />
                                <input
                                    type="number"
                                    name="month"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    placeholder="Tháng sinh"
                                    className={styles.inputField}
                                    min="1"
                                    max="12"
                                />

                                <input
                                    type="number"
                                    name="year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    placeholder="Năm sinh"
                                    className={styles.inputField}
                                    min="1900"
                                />
                            </section>

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

                            <section className={styles.formPolicy}>
                                <input type="checkbox" className={styles.policyCheckbox} onChange={handleChange} />
                                <p>
                                    Tôi đồng ý với các <a href="/#">điều kiện điều khoản</a> và{' '}
                                    <a href="/#">chính sách bảo mật</a>
                                </p>
                            </section>
                            <section className={styles.error2}>
                                <p className={styles.error}>{validationMsg.accept}</p>
                            </section>
                            <section className={styles.formContainer}>
                                <input
                                    type="submit"
                                    className={styles.btnSubmit}
                                    value="Đăng ký"
                                    onClick={handleSubmit}
                                />
                            </section>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Register;

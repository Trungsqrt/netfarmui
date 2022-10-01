import styles from "../components/Register.module.css";
import React, { useState } from "react";

function Register({ setOverlay }) {
   const close = () => {
      setOverlay(false);
   };

   const [input, setInput] = useState({
      password: "",
      confirmPassword: "",
   });

   const [error, setError] = useState({
      password: "",
      confirmPassword: "",
   });

   const onInputChange = (e) => {};

   const validateInput = (e) => {};
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
                  <form className={styles.form}>
                     <section className={styles.formContainer}>
                        <input
                           type="text"
                           name="fname"
                           required
                           placeholder="Họ lót"
                           className={(styles.inputField, styles.nameField)}
                        />
                        <input
                           type="text"
                           name="lname"
                           required
                           placeholder="Tên"
                           className={(styles.inputField, styles.nameField)}
                        />
                     </section>

                     <section className={styles.formContainer}>
                        <input
                           type="number"
                           name="phone"
                           required
                           minLength={10}
                           placeholder="Số điện thoại"
                           className={styles.inputField}
                        />
                     </section>

                     <section className={styles.formContainer}>
                        <input
                           type="password"
                           name="pass"
                           required
                           minLength={6}
                           placeholder="Mật khẩu"
                           className={styles.inputField}
                        />
                     </section>

                     <section className={styles.formContainer}>
                        <input
                           type="password"
                           name="repass"
                           required
                           minLength={6}
                           placeholder="Xác nhận mật khẩu"
                           className={styles.inputField}
                        />
                     </section>
                     <section className={styles.formContainer}>
                        <input
                           type="number"
                           name="day"
                           required
                           placeholder="Ngày sinh"
                           className={styles.inputField}
                        />
                        <input
                           type="number"
                           name="month"
                           required
                           placeholder="Tháng sinh"
                           className={styles.inputField}
                        />
                        <input
                           type="number"
                           name="year"
                           required
                           placeholder="Năm sinh"
                           className={styles.inputField}
                        />
                     </section>

                     <section className={styles.formGender}>
                        <section className={styles.radioBtn}>
                           <label>Nam</label>
                           <input
                              type="radio"
                              name="gender"
                              value="nam"
                              required
                           />
                        </section>
                        <section className={styles.radioBtn}>
                           <label>Nữ</label>
                           <input type="radio" name="gender" value="nữ" />
                        </section>
                        <section className={styles.radioBtn}>
                           <label>Khác</label>

                           <input
                              type="radio"
                              id="javascript"
                              name="gender"
                              value="JavaScript"
                           />
                        </section>
                     </section>
                     <section className={styles.formPolicy}>
                        <input
                           type="checkbox"
                           className={styles.policyCheckbox}
                           required
                        />
                        <p>
                           Tôi đồng ý với các{" "}
                           <a href="#">điều kiện điều khoản</a> và{" "}
                           <a href="#">chính sách bảo mật</a>
                        </p>
                     </section>
                     <section className={styles.formContainer}>
                        <input
                           type="submit"
                           className={styles.btnSubmit}
                           value="Đăng nhập"
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

import { useState } from "react";
import styles from "./Login.module.css";
import loginImage from "../assets/image/loginImage.jpg";
import Register from "./Register";
function Login() {
   const [overlay, setOverlay] = useState(false);

   return (
      <section className={styles.container}>
         {/* Left */}
         <div className={styles.left}>
            <img src={loginImage} alt="" className={styles.loginImage} />
         </div>
         {/* Right */}
         <div className={styles.right}>
            <div className={styles.loginForm}>
               {/* Label */}
               <div className={styles.label}>
                  <h5 className={styles.title}>Đăng nhập</h5>
                  <p className={(styles.title, styles.titleDesc)}>
                     Nhập tên tài khoản hoặc số điện thoại và mật khẩu
                  </p>
               </div>
               {/* Form */}
               <form>
                  {/* usn */}
                  <div className={styles.inputContainer}>
                     <input
                        type="text"
                        name="uname"
                        required
                        minLength={6}
                        placeholder="Tài khoản / Số điện thoại"
                        className={styles.inputField}
                     />
                     <i class="iconAuth fa-solid fa-user"></i>
                  </div>
                  {/* psw */}
                  <div className={styles.inputContainer}>
                     <input
                        type="password"
                        name="pass"
                        required
                        minLength={6}
                        placeholder="Mật khẩu"
                        className={styles.inputField}
                     />
                     <i class="iconAuth fa-solid fa-lock"></i>
                  </div>
                  {/* forgot password */}
                  <div className={styles.forgotSection}>
                     <a href="#" className={styles.forgot}>
                        Quên mật khẩu
                     </a>
                  </div>
                  {/* btn */}
                  <div>
                     <input
                        type="submit"
                        className="btnSubmit"
                        value="Đăng nhập"
                     />
                  </div>
               </form>

               <div className={styles.line}></div>

               <div className={styles.createNew}>
                  <div className={styles.createNewSection}>
                     <input
                        type="submit"
                        value="Đăng ký"
                        className={styles.createNewBtn}
                        onClick={() => setOverlay(true)}
                     />
                  </div>
               </div>
            </div>
         </div>
         {overlay ? <Register setOverlay={setOverlay} /> : ""}
      </section>
   );
}

export default Login;

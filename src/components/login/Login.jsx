/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import styles from "./Login.module.css";
import loginImage from "../../assets/image/loginImage.jpg";
import Register from "../register/Register";
import Forgot from "../forgot/Forgot";
import isEmpty from "validator/lib/isEmpty";
// import axios from "../../api/axios";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
   const [overlay, setOverlay] = useState(false);
   const [overlay2, setOverlay2] = useState(false);
   const [uname, setUname] = useState("");
   const [pass, setPass] = useState("");
   const [validationMsg, setValidationMsg] = useState({});
   const dispatch = useDispatch();
   const navigate = useNavigate();
   // const [users, setUsers] = useState();

   const validateAll = () => {
      const msg = {};
      if (isEmpty(uname)) {
         msg.uname = "Hãy nhập số điện thoại!";
      }
      if (isEmpty(pass)) {
         msg.pass = "Hãy nhập mật khẩu!";
      }

      setValidationMsg(msg);
      if (Object.keys(msg).length > 0) return false;
      return true;
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const isValid = validateAll();
      if (!isValid) return;

      const newUser = {
         username: uname,
         password: pass,
      };
      loginUser(newUser, dispatch, navigate);
   };

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
               <form autoComplete="off">
                  {/* NOTE: usn */}

                  <div className={styles.inputContainer}>
                     <input
                        id="uname"
                        type="number"
                        name="uname"
                        placeholder="Tài khoản / Số điện thoại"
                        className={styles.inputField}
                        value={uname}
                        onChange={(e) => setUname(e.target.value)}
                     />
                     <i className="iconAuth fa-solid fa-user"></i>
                     <p className={styles.error}>{validationMsg.uname}</p>
                  </div>

                  {/* psw */}
                  <div className={styles.inputContainer}>
                     <input
                        id="pass"
                        type="password"
                        name="pass"
                        placeholder="Mật khẩu"
                        className={styles.inputField}
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                     />
                     <i className="iconAuth fa-solid fa-lock"></i>
                  </div>
                  <p className={styles.error}>{validationMsg.pass}</p>
                  {/* forgot password */}
                  <div className={styles.forgotSection}>
                     <a
                        href="/#"
                        className={styles.forgot}
                        onClick={() => setOverlay2(true)}
                     >
                        Quên mật khẩu
                     </a>
                  </div>
                  {overlay2 ? <Forgot setOverlay2={setOverlay2} /> : ""}
                  {/* btn */}
                  <button
                     type="submit"
                     className="btnSubmit"
                     onClick={handleSubmit}
                  >
                     Đăng nhập
                  </button>
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

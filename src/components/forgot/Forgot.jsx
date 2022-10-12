import React from "react";
import styles from "../forgot/Forgot.module.css";
function Forgot({ setOverlay2 }) {
   const close = () => {
      setOverlay2(false);
   };
   return (
      <div>
         <div className={styles.container}>
            <div className={styles.overlay}>
               <div className={styles.modal}>
                  <span className={styles.iconCross} onClick={close}>
                     &times;
                  </span>
                  <div className={styles.formBody}>
                     <section className={styles.label}>
                        <h5 className={styles.title}>Quên mật khẩu</h5>
                        <p className={styles.titleDesc}>
                           Nhập thông tin tài khoản
                        </p>
                     </section>
                     <section className={styles.formContainer}>
                        <form>
                           {/* usn */}
                           <div className={styles.inputContainer}>
                              <input
                                 type="number"
                                 name="phone"
                                 required
                                 minLength={10}
                                 placeholder="Nhập số điện thoại"
                                 className={styles.inputField}
                              />
                           </div>
                           {/* btn */}
                           <div className={styles.btnSubmitContainer}>
                              <input
                                 type="submit"
                                 value="Nhận mã xác nhận"
                                 className={styles.btnSubmit}
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

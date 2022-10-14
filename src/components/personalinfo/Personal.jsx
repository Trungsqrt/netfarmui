import React, { useState } from "react";
import styles from "./Personal.module.css";
import { useNavigate } from "react-router-dom";

function Personal() {
   const [fname, setFname] = useState("");
   const [lname, setLname] = useState("");
   const [uname, setUname] = useState("");
   const [mail, setMail] = useState("");
   const [cccd, setCccd] = useState("");
   const [day, setDay] = useState("");
   const [month, setMonth] = useState("");
   const [year, setYear] = useState("");
   const [gender, setGender] = useState(true);
   const [accept, setAccept] = useState("");

   const navigate = useNavigate();
   return (
      <div>
         <div className={styles.body}>
            <div className={styles.container}>
               <section className={styles.title}>Thông tin người dùng</section>
               <section className={styles.bodyContainer}>
                  <section>
                     <section className={styles.formContainer}>
                        <form className={styles.inputContainer}>
                           <section className={styles.inputForm}>
                              <section>
                                 {/* NOTE: name */}
                                 <div
                                    className={
                                       (styles.name, styles.formElement)
                                    }
                                 >
                                    <p className={styles.titleContent}>
                                       Họ và tên
                                    </p>
                                    <input
                                       type="text"
                                       name="fname"
                                       placeholder="Họ lót"
                                       className={
                                          (styles.inputField, styles.nameField)
                                       }
                                       value={fname}
                                       onChange={(e) =>
                                          setFname(e.target.value)
                                       }
                                    />
                                    <input
                                       type="text"
                                       name="lname"
                                       placeholder="Tên"
                                       className={
                                          (styles.inputField, styles.nameField)
                                       }
                                       value={lname}
                                       onChange={(e) =>
                                          setLname(e.target.value)
                                       }
                                    />
                                 </div>

                                 {/* NOTE: sdt */}
                                 <div
                                    className={
                                       (styles.name, styles.formElement)
                                    }
                                 >
                                    <p className={styles.titleContent}>
                                       Số điện thoại
                                    </p>
                                    <input
                                       type="number"
                                       name="uname"
                                       id="uname"
                                       onChange={(e) =>
                                          setUname(e.target.value)
                                       }
                                       placeholder="Số điện thoại"
                                       className={styles.inputField}
                                       value={uname}
                                    />
                                 </div>

                                 {/* NOTE: email */}
                                 <div
                                    className={
                                       (styles.name, styles.formElement)
                                    }
                                 >
                                    <p className={styles.titleContent}>Email</p>
                                    <input
                                       type="mail"
                                       name="mail"
                                       id="mail"
                                       onChange={(e) => setMail(e.target.value)}
                                       placeholder="Email"
                                       className={styles.inputField}
                                       value={mail}
                                    />
                                 </div>
                                 {/* NOTE: CCCD */}
                                 <div
                                    className={
                                       (styles.name, styles.formElement)
                                    }
                                 >
                                    <p className={styles.titleContent}>CCCD</p>
                                    <input
                                       type="number"
                                       name="cccd"
                                       id="cccd"
                                       onChange={(e) => setCccd(e.target.value)}
                                       placeholder="CCCD"
                                       className={styles.inputField}
                                       value={cccd}
                                    />
                                 </div>
                                 {/* NOTE: ngay thang nam sinh */}
                                 <div
                                    className={
                                       (styles.name, styles.formElement)
                                    }
                                 >
                                    <p className={styles.titleContent}>
                                       Ngày sinh
                                    </p>
                                    <input
                                       type="number"
                                       name="day"
                                       value={day}
                                       onChange={(e) => setDay(e.target.value)}
                                       placeholder="Ngày sinh"
                                       className={styles.inputField}
                                    />
                                    <input
                                       type="number"
                                       name="month"
                                       value={month}
                                       onChange={(e) =>
                                          setMonth(e.target.value)
                                       }
                                       placeholder="Tháng sinh"
                                       className={styles.inputField}
                                    />

                                    <input
                                       type="number"
                                       name="year"
                                       value={year}
                                       onChange={(e) => setYear(e.target.value)}
                                       placeholder="Năm sinh"
                                       className={styles.inputField}
                                    />
                                 </div>

                                 {/* NOTE: gioi tinh */}
                                 <div
                                    className={
                                       (styles.name, styles.formElement)
                                    }
                                 >
                                    <p className={styles.titleContent}>
                                       Giới tính
                                    </p>
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
                                 </div>
                              </section>

                              <section className={styles.infoImage}>
                                 {/* <img src="" alt="" /> */}
                                 <div
                                    style={{
                                       width: "100px",
                                       height: "100px",
                                       backgroundColor: "blue",
                                    }}
                                 ></div>
                              </section>
                           </section>

                           <section className={styles.btnSub}>
                              <input
                                 type="submit"
                                 className={styles.btnSubmit}
                                 value="Xác nhận"
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
                        navigate("/");
                     }}
                  >
                     Trở lại
                  </button>
               </section>
            </div>
         </div>
      </div>
   );
}

export default Personal;

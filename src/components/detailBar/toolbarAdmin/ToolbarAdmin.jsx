import React from "react";
import styles from "./ToolbarAdmin.module.css";
import { useNavigate } from "react-router-dom";
function ToolbarAdmin() {
   const navigate = useNavigate();
   return (
      <div>
         <div className={styles.container}>
            <div className={styles.item} onClick={() => navigate("/admin")}>
               <h1>Quản lý bài đăng & tài khoản</h1>
            </div>

            <div
               className={styles.item}
               onClick={() => navigate("/calenderhandler")}
            >
               <h1>Tạo lịch thời vụ</h1>
            </div>

            <div className={styles.item}>
               <h1>Gửi thông báo</h1>
            </div>

            <div
               className={styles.item}
               onClick={() => navigate("/articlehandler")}
            >
               <h1>Tạo bài viết</h1>
            </div>

            <div
               className={styles.item}
               onClick={() => navigate("/createexpert")}
            >
               <h1>Tạo tài khoản chuyên gia</h1>
            </div>

            <div className={styles.item} onClick={() => navigate("/")}>
               <h1>Đổi mật khẩu</h1>
            </div>

            <div className={styles.item} onClick={() => navigate("/login")}>
               <h1>Đăng xuất</h1>
            </div>
         </div>
      </div>
   );
}

export default ToolbarAdmin;

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.text}>404</div>
            <div className={styles.text}>Trang không tồn tại</div>
            <Link to={'/'} className={styles.link}>
                <div className={styles.link}>Trở về trang chủ</div>
            </Link>
        </div>
    );
}

export default NotFound;

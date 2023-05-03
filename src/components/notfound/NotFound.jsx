import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
function NotFound() {
    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');

    useEffect(() => {
        if (getUser) {
            const currentUser = JSON.parse(getUser);
            setUser(currentUser.roleName);
        }
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.text}>404</div>
            <div className={styles.text}>Trang không tồn tại</div>
            <Link to={user === 'Admin' || user === 'Expert' ? '/AdminHome' : '/'} className={styles.link}>
                <div className={styles.link}>Trở về trang chủ</div>
            </Link>
        </div>
    );
}

export default NotFound;

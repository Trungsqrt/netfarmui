import React from 'react';
import styles from './ToolbarAdmin.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/apiRequest';

function ToolbarAdmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        logoutUser(dispatch, navigate);
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.item} onClick={() => navigate('/createexpert')}>
                    <h5 style={{fontSize:14}}>Tạo tài khoản chuyên gia</h5>
                </div>

                <div className={styles.item} onClick={() => navigate('/changepassword')}>
                    <h5 style={{fontSize:14}}>Đổi mật khẩu</h5>
                </div>

                <div className={styles.item} onClick={handleLogout}>
                    <h5 style={{fontSize:14}}>Đăng xuất</h5>
                </div>
            </div>
        </div>
    );
}

export default ToolbarAdmin;

import React from 'react';
import styles from './ToolbarFarmer.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/apiRequest';

function ToolbarFarmer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        logoutUser(dispatch, navigate);
    };
    return (
        <div>
            <div>
                <div className={styles.container}>
                    <div className={styles.item} onClick={() => navigate('/createexpert')}>
                        <h5>Thay đổi thông tin</h5>
                    </div>

                    <div className={styles.item} onClick={() => navigate('/')}>
                        <h5>Đổi mật khẩu</h5>
                    </div>

                    <div className={styles.item} onClick={handleLogout}>
                        <h5>Đăng xuất</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToolbarFarmer;

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
                <div className={styles.container}>
                    <div className={styles.item} onClick={() => navigate('/personal')}>
                        <h5 style={{fontSize:14}}>Thay đổi thông tin</h5>
                    </div>

                    <div className={styles.item} onClick={() => navigate('/changepassword')}>
                        <h5 style={{fontSize:14}}>Đổi mật khẩu</h5>
                    </div>
                    <div className={styles.item} onClick={() => navigate('/shop/orderlist')}>
                        <h5 style={{fontSize:14}}>Đơn mua</h5>
                    </div>
                    <div className={styles.item} onClick={() => navigate('/manage/Feedback')}>
                        <h5 style={{fontSize:14}}>Phản hồi</h5>
                    </div>
                    <div className={styles.item} onClick={handleLogout}>
                        <h5 style={{fontSize:14}}>Đăng xuất</h5>
                    </div>
                </div>
    );
}

export default ToolbarFarmer;

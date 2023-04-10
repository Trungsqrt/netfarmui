import { CheckCircleOutlined,CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../share/header/Header';
import styles from './ResultPayment.module.css';

const ResultPaymentComponent = () => {
    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState(false);
    useEffect(() => {
        setUser(currentUser.roleName);
        // if (idEdit) {
        //     fillCurrentData();
        // }
    }, []);

    return (
        <div>
            {paymentStatus === true && user === 'Farmer' ? (
                <>
                    <Header />
                    <div className={styles.container}>
                        <div style={{width: 'fit-content',margin:'0 auto',background:'#F2F6F7',padding:'10px',borderRadius:'2%'}}>
                        <div className={styles.content}>
                            <h2>Thanh toán thành công</h2>
                        </div>
                        <CheckCircleOutlined
                            className={styles.checkIcon}
                            style={{ fontSize: '56px', color: '#66E868' }}
                        />
                        <div className={styles.notificationSytem}>
                            <h4>Thanh toán đã thực hiện thành công. Trong vòng 30 phút</h4>
                            <h4>NetFarm sẽ liên hệ xác nhận thông tin giao hàng cho quý khách</h4>
                        </div>
                        <div className={styles.informationPay}>
                            <div className={styles.informationRow}>
                                <div>Hình thức thanh toán</div>
                                <div>Thanh toán qua VNpay</div>
                            </div>
                            <div className={styles.informationRow}>
                                <div>Địa chỉ nhận hàng</div>
                                <div>Da Nang</div>
                            </div>
                            <div className={styles.informationRow}>
                                <div>Số điện thoại</div>
                                <div>09324557548</div>
                            </div>
                            <div className={styles.informationRowMoney}>
                                <div>Số tiền</div>
                                <div>175.000 VND</div>
                            </div>
                            <div className={styles.informationRow}>
                                <div>Mã giao dịch</div>
                                <div>dfnhgasvuwqkqwbd</div>
                            </div>
                            <div className={styles.buttonWayBack}>
                                <Button type="primary" danger>
                                    Tiếp tục mua sắm
                                </Button>
                            </div>
                        </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Header />
                    <div className={styles.container}>
                        <div style={{width: 'fit-content',margin:'0 auto',background:'#F2F6F7',padding:'10px',borderRadius:'2%'}}>
                        <div className={styles.content}>
                            <h2>Thanh toán Không thành công</h2>
                        </div>
                        <CloseCircleOutlined
                            className={styles.checkIcon}
                            style={{ fontSize: '56px', color: '#E60509' }}
                        />
                        <div className={styles.notificationSytem}>
                            <h4>Liên hệ trực tiếp NetFarm để được biết thêm chi tiết</h4>
                            <br/>
                            <h4>hotline: (+84) 236.3650403 - (+84) 236.3827111</h4>
                        </div>
                        <div className={styles.informationPay}>
                            <div className={styles.buttonWayBackCart}>
                                <Button type="primary" danger>
                                    Quay lại giỏ hàng
                                </Button>
                            </div>
                        </div>
                        </div>
                    </div>
                </>
            )}
            {/* {user === 'Admin' && navigate('/AdminHome')}
    {user === 'Farmer' && navigate('/')} */}
        </div>
    );
};

export default ResultPaymentComponent;

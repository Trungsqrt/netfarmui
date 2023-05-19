import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import axios from 'axios';
import { default as React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallAPI } from '../../share/common/useCallAPI';
import NewHeader from '../../share/newheader/NewHeader';
import styles from './ResultPayment.module.css';

const ResultPaymentComponent = () => {
    const [vnp_Amount, setVnp_Amount] = useState();
    const [vnp_TmnCode, setVnp_TmnCode] = useState();
    const [vnp_BankCode, setVnp_BankCode] = useState();
    const [vnp_OrderInfo, setVnp_OrderInfo] = useState();

    const useURL = 'https://localhost:44303/api/Users';
    const orderURL = 'https://localhost:44303/api/Order';
    const orderID = localStorage.getItem('idOrder');
    const cartUrl = 'https://localhost:44303/api/Carts';

    const [user, setUser] = useState();
    const [orderInfor, setOrderInfor] = useState();
    const [carts, setCarts] = useState([]);
    var checkList = localStorage.getItem('checklist').split(',');

    const {
        data: order,
        loading,
        error,
    } = useCallAPI(`${orderURL}/${orderID}`, (data) => {
        setOrderInfor(data);
    });

    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState(true);

    const fetchData = async () => {
        const getUser = JSON.parse(localStorage.getItem('user'));
        const userID = getUser.userId;

        const vnp_Amount = new URLSearchParams(window.location.search).get('vnp_Amount');
        const vnp_BankCode = new URLSearchParams(window.location.search).get('vnp_TmnCode');
        const vnp_TmnCode = new URLSearchParams(window.location.search).get('vnp_BankCode');
        setVnp_Amount(vnp_Amount);
        setVnp_BankCode(vnp_BankCode);
        setVnp_TmnCode(vnp_TmnCode);
        const response = await axios.get(cartUrl);
        const data = response.data;
        const filter = data.filter((item) => item['userId'] === userID);
        const filter2 = filter.filter((item) => checkList.includes(`${item['id']}`));
        for (let i = 0; i < filter2.length; i++) {
            window.location.reload();
            await axios.delete(`${cartUrl}/${filter2[i].id}`);
        }

        const userData = await axios.get(`${useURL}/${userID}`);
        setUser(userData?.data);

        const orderinforma = await axios.get(`${orderURL}/${orderID}`);
        let tmp = orderinforma?.data;

        if (vnp_Amount === null || vnp_BankCode === null || vnp_TmnCode === null) {
            setPaymentStatus(false);
        } else {
            tmp.status = 'true';
            setPaymentStatus(true);
            await axios.put(`${orderURL}/${orderID}`, tmp);
            setOrderInfor(tmp);

            localStorage.removeItem('checkList');
        }
        window.location.reload();
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {paymentStatus === true ? (
                <>
                    <Layout style={{ display: 'block', marginBottom: '100px' }}>
                        <NewHeader></NewHeader>
                    </Layout>
                    <div className={styles.container}>
                        <div
                            style={{
                                width: 'fit-content',
                                margin: '0 auto',
                                background: '#F2F6F7',
                                padding: '10px',
                                borderRadius: '2%',
                            }}
                        >
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
                                    <div>thanh toán qua vnPay</div>
                                </div>
                                <div className={styles.informationRow}>
                                    <div>Ngân Hàng</div>
                                    <div>{vnp_BankCode}</div>
                                </div>
                                <div className={styles.informationRow}>
                                    <div>Địa chỉ nhận hàng</div>
                                    <div>{orderInfor?.address}</div>
                                </div>
                                <div className={styles.informationRow}>
                                    <div>Số điện thoại</div>
                                    <div>{orderInfor?.phone}</div>
                                </div>
                                <div className={styles.informationRowMoney}>
                                    <div>Số tiền</div>
                                    <div>{vnp_Amount}</div>
                                </div>
                                <div className={styles.informationRow}>
                                    <div>Mã giao dịch</div>
                                    <div>{vnp_TmnCode}</div>
                                </div>
                                <div className={styles.buttonWayBack}>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => {
                                            navigate('/shop');
                                        }}
                                    >
                                        Tiếp tục mua sắm
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Layout style={{ display: 'block', marginBottom: '100px' }}>
                        <NewHeader></NewHeader>
                    </Layout>
                    <div className={styles.container}>
                        <div
                            style={{
                                width: 'fit-content',
                                margin: '0 auto',
                                background: '#F2F6F7',
                                padding: '10px',
                                borderRadius: '2%',
                            }}
                        >
                            <div className={styles.content}>
                                <h2>Thanh toán Không thành công</h2>
                            </div>
                            <CloseCircleOutlined
                                className={styles.checkIcon}
                                style={{ fontSize: '56px', color: '#E60509' }}
                            />
                            <div className={styles.notificationSytem}>
                                <h4>Liên hệ trực tiếp NetFarm để được biết thêm chi tiết</h4>
                                <br />
                                <h4>hotline: (+84) 236.3650403 - (+84) 236.3827111</h4>
                            </div>
                            <div className={styles.informationPay}>
                                <div className={styles.buttonWayBackCart}>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => {
                                            navigate('/shop/cart');
                                        }}
                                    >
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

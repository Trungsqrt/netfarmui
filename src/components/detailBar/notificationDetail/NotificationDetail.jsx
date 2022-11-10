import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotificationDetail.module.css';
import axios from 'axios';

function NotificationDetail() {
    const [isSigned, SetIsSigned] = useState(false);
    const [notification, setNotification] = useState([]);
    const nagivate = useNavigate();
    function truncate(str, n) {
        return str.length > n ? str.slice(0, n - 1) + '...' : str;
    }

    function getText(html) {
        var divContainer = document.createElement('div');
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || '';
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            SetIsSigned(true);
            (async function () {
                const res = await axios.get('https://localhost:44303/api/Article');
                const response = res.data;
                let comments = [];
                let newArray = [];
                response.forEach((item) => {
                    if (item.status === false) {
                        comments.push(item);
                    }
                });
                if (comments.length >= 5) {
                    const arrayFilterYet = [...comments];
                    const arrayFiltered = [];
                    let amountOfLeftComment = 1;
                    while (amountOfLeftComment <= 5) {
                        arrayFiltered.push(arrayFilterYet.at(amountOfLeftComment * -1));
                        ++amountOfLeftComment;
                    }
                    newArray = [...arrayFiltered];
                    setNotification(newArray);
                } else {
                    setNotification(comments);
                }
            })();
        } else {
            SetIsSigned(false);
        }
    }, []);

    return (
        <div className={styles.notificationContainer}>
            <section>
                <h3
                    style={{
                        fontWeight: 'bold',
                        margin: '5px',
                        textAlign: 'center',
                        fontSize: '14px',
                    }}
                >
                    Thông báo
                </h3>
                <section className={styles.itemContainer}>
                    {isSigned && (
                        <section>
                            <section className={styles.itemWrap}>
                                {notification?.map((i, index) => (
                                    <section
                                        className={`${styles.item}`}
                                        key={index}
                                        onClick={() => {
                                            nagivate(`/detail/${i.id}`);
                                        }}
                                    >
                                        {/* ${styles.nonRead} */}
                                        <section className={styles.imageS}>
                                            <img src={i.imageURL} className={styles.imageSection}></img>
                                        </section>
                                        <p className={styles.contentSection}>
                                            <section className={styles.notificationTitle}>
                                                <strong>{truncate(i.title, 30)}</strong>
                                            </section>
                                            <section className={styles.notificationContent}>
                                                {getText(truncate(i.content, 30))}
                                            </section>
                                        </p>
                                    </section>
                                ))}
                            </section>
                        </section>
                    )}
                    {!isSigned && (
                        <h3 style={{ fontSize: '15px', textAlign: 'center', color: 'red' }}>Vui lòng đăng nhập!</h3>
                    )}
                </section>
            </section>
        </div>
    );
}

export default NotificationDetail;

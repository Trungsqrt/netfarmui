import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import articleAPI from '../../../../src/apis/articleAPI';
import Footer from '../share/footer/Footer';
import Menuleft from '../share/menu/Menuleft';
import Comment from '../comment/Comment';
import { default as StaffHeader } from '../../admin_farm/share/header/Header';
import { default as FarmerHeader } from '../share/header/Header';
import styles from './DetailArticle.module.css';
const parse = require('html-react-parser');

function DetailArticle(props) {
    const [detail, setDetail] = useState({});
    const [showComment, setShowComment] = useState(false);
    const dispatch = useDispatch();
    const [userr, setUserr] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);

    //id params cho từng sản phẩm
    const { id } = useParams();
    const idArticle = id;

    //Hàm này để lấy dữ liệu chi tiết sản phẩm
    useEffect(() => {
        const fetchData = async () => {
            const response = await articleAPI.getDetail(id);
            // console.log('DETAIL', response.data);
            setDetail(response.data);
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const user = localStorage.getItem('user');
        user ? setUserr(currentUser.roleName) : setUserr('');
        user ? setShowComment(true) : setShowComment(false);
    }, []);

    return (
        <div>
            <div className={styles.wrapper}>
                {detail && (
                    <div>
                        <section>
                            {(userr === 'Admin' || userr === 'Expert') && <StaffHeader />}
                            {!(userr === 'Admin' || userr === 'Expert') && <FarmerHeader />}
                        </section>
                        <div className="Banner"></div>
                        <div className={styles.main}>
                            <div className={styles.left}>
                                <Menuleft></Menuleft>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.detailWrapper}>
                                    <h3 className={styles.title}>{detail.title}</h3>
                                    <div className={styles.contentRender}>{parse(String(detail.content))}</div>
                                </div>
                            </div>
                        </div>
                        {showComment && <Comment idArticle={idArticle} />}
                        <Footer></Footer>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailArticle;

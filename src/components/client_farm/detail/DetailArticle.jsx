import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import articleAPI from '../../../../src/apis/articleAPI';
import Footer from '../share/footer/Footer';
import Comment from '../comment/Comment';
import { default as StaffHeader } from '../../admin_farm/share/header/Header';
import { default as FarmerHeader } from '../share/header/Header';
import styles from './DetailArticle.module.css';
import './DetailArticle.css';
const parse = require('html-react-parser');

function DetailArticle(props) {
    let navigate = useNavigate();
    const [detail, setDetail] = useState({});
    const [showComment, setShowComment] = useState(false);
    const dispatch = useDispatch();
    const [userr, setUserr] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const [relateds, setRelateds] = useState([]);
    const [news, setNews] = useState([]);
    //id params cho từng sản phẩm
    const { id } = useParams();
    const idArticle = id;

    //Hàm này để lấy dữ liệu chi tiết sản phẩm
    useEffect(() => {
        const fetchData = async () => {
            const response = await articleAPI.getDetail(id);
            // console.log('DETAIL', response.data);
            setDetail(response.data);

            const relate = await articleAPI.getAPI();
            setRelateds(relate.data.slice(0, 4));
            setNews(relate.data.slice(4, 8));
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
                        <div className="DetailBanner"></div>
                        <div className={styles.main}>
                            <div className={styles.right}>
                                <div className={styles.detailWrapper}>
                                    <h3 className={styles.title}>{detail.title}</h3>
                                    <div className={styles.contentRender}>{parse(String(detail.content))}</div>
                                </div>
                            </div>
                            <div className={styles.left}>
                                <div className={styles.relatedTitle}>Chuyên mục mới</div>
                                <ul className={styles.related}>
                                    {news
                                        ? news.map((item) => (
                                              <Link className="link_article" to={`/detail/${item.id}`}>
                                                  <li className={styles.relatedItem}>
                                                      <h4 className={styles.newsItemTitle}>{item.title}</h4>
                                                      <div className={styles.newsItemLine}></div>
                                                  </li>
                                              </Link>
                                          ))
                                        : ''}
                                </ul>
                                <div className={styles.relatedTitle}> Được quan tâm</div>
                                <ul className={styles.related}>
                                    {relateds
                                        ? relateds.map((item) => (
                                              <Link className="link_article" to={`/detail/${item.id}`}>
                                                  <li className={styles.relatedItem}>
                                                      <img className={styles.relatedImg} src={item.imageURL} alt="" />
                                                      <h4 className={styles.relatedItemTitle}>{item.title}</h4>
                                                      <div className={styles.relatedItemLine}></div>
                                                  </li>
                                              </Link>
                                          ))
                                        : ''}
                                </ul>
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

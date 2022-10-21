import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import articleAPI from '../../../../src/apis/articleAPI';
import Header from '../share/header/Header';
import Footer from '../share/footer/Footer';
import Menuleft from '../share/menu/Menuleft';
function DetailArticle(props) {
    const [detail, setDetail] = useState({});
    const dispatch = useDispatch();

    //id params cho từng sản phẩm
    const { id } = useParams();

    //Hàm này để lấy dữ liệu chi tiết sản phẩm
    useEffect(() => {
        const fetchData = async () => {
            const response = await articleAPI.getDetail(id);
            console.log(response.data);
            setDetail(response.data);
        };
        fetchData();
    }, [id]);
    return (
        <div>
            <div className="wrapper">
                {detail && (
                    <div>
                        <Header></Header>
                        <div className="Banner"></div>
                        <div className="main">
                            <div className="column-left">
                                <Menuleft></Menuleft>
                            </div>
                            <div className="column-right">
                                <div className="detail_wrapper">
                                    <h1 className="title">{detail.article_title}</h1>
                                    <div>
                                        <img src={detail.img} className="article_img"></img>
                                        <div className="line"></div>
                                        <div className="content">{detail.article_content}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer></Footer>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailArticle;

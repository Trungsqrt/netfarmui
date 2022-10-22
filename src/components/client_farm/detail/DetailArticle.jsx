import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import articleAPI from '../../../../src/apis/articleAPI';
import Header from '../share/header/Header';
import Footer from '../share/footer/Footer';
import Menuleft from '../share/menu/Menuleft';
import Comment from '../comment/Comment';
const parse = require('html-react-parser');

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

    let Content;
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
                                    <h1 className="title">{detail.title}</h1>
                                    <div>
                                        <img src={detail.imageURL} className="article_img"></img>
                                        <div className="line"></div>
                                        {/* <div className="content">{parse(detail.content)}</div> */}
                                        {parse(String(detail.content))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Comment />
                        <Footer></Footer>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailArticle;

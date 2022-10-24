import React, { useEffect, useState } from 'react';
import Header from '../../share/header/Header';
import Footer from '../../share/footer/Footer';
import Menuleft from '../../share/menu/Menuleft';
import Article from '../../article/Article';
import articleAPI from '../../../../apis/articleAPI';
import '../InforPage.css';
const InforPage = () => {
    // lấy dữ liệu toàn bộ các bài đăng
    const [articles, setArticles] = useState([]);
    const [manualItems, setManualItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await articleAPI.getAPI();
            const data = response.data;
            setArticles(articles);
            // // lấy các bài đăng thuộc category chính sách
            // trường hợp có nhiều bài thì lấy 3 nếu ko đúng bằng đồ dài của số bài đăng
            const filterManual = data.filter((item) => item['aCategoryName'] === 'huongdan');
            setManualItems(filterManual);
        };
        fetchData();
    }, []);

    return (
        <div>
            <div>
                <Header></Header>
                <div className="infor_main">
                    <div className="menu">
                        <Menuleft></Menuleft>
                    </div>
                    <div className="infor_container">
                        <div className="row">
                            <div className="section_title">Nông nghiệp mới và hướng dẫn</div>
                            <div>
                                <div class="listarticle">
                                    {manualItems
                                        ? manualItems.map((item, index) => (
                                              <Article
                                                  article={item}
                                                  key={item.id}
                                                  update={item.id}
                                                  number={index}
                                              ></Article>
                                          ))
                                        : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default InforPage;

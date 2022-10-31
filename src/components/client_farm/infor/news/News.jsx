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
    const [Items, setItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await articleAPI.getAPI();
            const data = response.data;
            setArticles(articles);
            // // lấy các bài đăng thuộc category tin tức
            const filter = data.filter((item) => item['aCategoryName'] === 'tintuc');
            setItems(filter);
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
                            <div className="section_title">Bản tin nông nghiệp</div>
                            <div>
                                <div className="listarticle">
                                    {Items
                                        ? Items.map((item, index) => (
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

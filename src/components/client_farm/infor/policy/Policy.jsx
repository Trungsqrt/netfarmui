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
    const [policyItems, setPolicyItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await articleAPI.getAPI();
            const data = response.data;
            setArticles(articles);
            // // lấy các bài đăng thuộc category chính sách
            // trường hợp có nhiều bài thì lấy 3 nếu ko đúng bằng đồ dài của số bài đăng
            const filterPolicy = data.filter((item) => item['category'] === 'chinhsach');
            setPolicyItems(filterPolicy);
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
                    <div className="container">
                        <div className="row">
                            <div className="section_title">Chính sách nhà nước</div>
                            <div>
                                <div class="listarticle">
                                    {policyItems
                                        ? policyItems.map((item, index) => (
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

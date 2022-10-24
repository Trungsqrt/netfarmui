import React, { useEffect, useState } from 'react';
import Header from '../share/header/Header';
import Footer from '../share/footer/Footer';
import Menuleft from '../share/menu/Menuleft';
import Article from '../article/Article';
import articleAPI from '../../../apis/articleAPI';
import Policy from '../article/Policy';
import './InforPage.css';
const InforPage = () => {
    // lấy dữ liệu toàn bộ các bài đăng
    const [articles, setArticles] = useState([]);
    const [newsItems, setNewItems] = useState([]);
    const [manualItems, setManualItems] = useState([]);
    const [policyItems, setPolicyItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await articleAPI.getAPI();
            const data = response.data;
            console.log('sdvxc', data);
            setArticles(articles);
            // lấy các bài đăng thuộc category tin tức
            const filtterNews = data.filter((item) => item['category'] === 'tintuc');
            const min = filtterNews.length > 3 ? 3 : filtterNews.length;
            setNewItems(filtterNews.slice(0, min));
            console.log('cxdcx', filtterNews);
            //lấy các bài đăng thuộc category manual
            const filterManual = data.filter((item) => item['category'] === 'huongdan');
            const min2 = filterManual.length > 3 ? 3 : filterManual.length;
            setManualItems(filterManual.slice(0, min2));

            // // lấy các bài đăng thuộc category chính sách
            // trường hợp có nhiều bài thì lấy 3 nếu ko đúng bằng đồ dài của số bài đăng
            const filterPolicy = data.filter((item) => item['category'] === 'chinhsach');
            const min3 = filterPolicy.length > 3 ? 3 : filterPolicy.length;
            setPolicyItems(filterPolicy.slice(0, min3));
            // console.log('news', policyItems);
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
                            <div className="col-2">
                                <div className="section_title">Hướng dẫn nông nghiệp</div>
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
                            <div className="col-2">
                                <div className="section_title">Tin tức nông nghiệp</div>
                                <div>
                                    <div class="listarticle">
                                        {newsItems
                                            ? newsItems.map((item, index) => (
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
                        <div className="row">lich nong vu ở đây</div>
                        <div className="row">
                            <div className="section_title">Chính sách</div>
                            <div>
                                <div class="listarticle">
                                    {policyItems
                                        ? policyItems.map((item, index) => (
                                              <Policy
                                                  article={item}
                                                  key={item.id}
                                                  update={item.id}
                                                  number={index}
                                              ></Policy>
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

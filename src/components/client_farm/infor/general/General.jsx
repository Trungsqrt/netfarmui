import React, { useEffect, useState } from 'react';
import Article from '../../article/Article';
import articleAPI from '../../../../apis/articleAPI';
import Policy from '../../article/Policy';
import './../InforPage.css';
import Schedule from '../schedule/Schedule';

const General = () => {
    // lấy dữ liệu toàn bộ các bài đăng
    const [articles, setArticles] = useState([]);
    const [newsItems, setNewItems] = useState([]);
    const [manualItems, setManualItems] = useState([]);
    const [policyItems, setPolicyItems] = useState([]);
    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    console.log('hi');
    useEffect(() => {
        const fetchData = async () => {
            const response = await articleAPI.getAPI();
            const data = response.data;
            console.log('sdvxc', data);
            setArticles(articles);
            // lấy các bài đăng thuộc category tin tức
            const filtterNews = data.filter((item) => item['aCategoryName'] === 'tintuc');
            const min = filtterNews.length > 3 ? 3 : filtterNews.length;
            setNewItems(filtterNews.slice(0, min));

            //lấy các bài đăng thuộc category manual
            const filterManual = data.filter((item) => item['aCategoryName'] === 'huongdan');
            const min2 = filterManual.length > 3 ? 3 : filterManual.length;
            setManualItems(filterManual.slice(0, min2));

            // // lấy các bài đăng thuộc category chính sách
            // trường hợp có nhiều bài thì lấy 3 nếu ko đúng bằng đồ dài của số bài đăng
            const filterPolicy = data.filter((item) => item['aCategoryName'] === 'chinhsach');
            const min3 = filterPolicy.length > 3 ? 3 : filterPolicy.length;
            setPolicyItems(filterPolicy.slice(0, min3));
        };
        fetchData();
    }, []);
    return (
        <div>
            <div className="general_row">
                <div className="col-2">
                    <div className="section_title_inf">Hướng dẫn nông nghiệp</div>
                    <div>
                        <div className="listarticle">
                            {manualItems
                                ? manualItems.map((item, index) => (
                                      <Article article={item} key={item.id} update={item.id} number={index}></Article>
                                  ))
                                : ''}
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="section_title_inf">Tin tức nông nghiệp</div>
                    <div>
                        <div className="listarticle">
                            {newsItems
                                ? newsItems.map((item, index) => (
                                      <Article article={item} key={item.id} update={item.id} number={index}></Article>
                                  ))
                                : ''}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="row">

            </div> */}
            <div className="row">
                <div className="section_title_inf">Chính sách</div>
                <div>
                    <div className="PolicyRow">
                        {policyItems
                            ? policyItems.map((item, index) => (
                                  <Policy article={item} key={item.id} update={item.id} number={index}></Policy>
                              ))
                            : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default General;

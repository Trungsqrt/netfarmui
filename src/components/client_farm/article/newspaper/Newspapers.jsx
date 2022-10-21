import React, { useEffect, useState } from 'react';
import articleAPI from '../../../../apis/articleAPI';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import './Newspaper.css';

function Newspapers(props) {
    const [articles, setArticles] = useState([]);

    // lấy dữ liệu toàn bộ cáo bài đăng
    useEffect(() => {
        const fetchData = async () => {
            const response = await articleAPI.getAPI();
            const data = response.data;
            console.log('filter', data);
            const filteredItems = data.filter((item) => item['category'] === 'tintuc');
            console.log('filter', filteredItems);
            setArticles(filteredItems);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Tin Tức</h1>
            <div className="news">
                {articles &&
                    articles.map((value) => (
                        <div className="owl-item cloned" key={value.Article_id}>
                            <Link to={`/detail/${value.Article_id}`} className="news_link">
                                <div className="item">
                                    <img src={value.img} className="news_img"></img>
                                    <div className="box">
                                        <h3>
                                            <a className="title">{value.article_title}</a>
                                        </h3>
                                        <div className="short-content">{value.article_content}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Newspapers;

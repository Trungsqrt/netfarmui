import React, { useEffect, useState } from 'react';
import articleAPI from '../../../../apis/articleAPI';
import { Link } from 'react-router-dom';
import './News.css';
import styles from './News.module.css';

function News(props) {
    const [articles, setArticles] = useState([]);

    // lấy dữ liệu toàn bộ cáo bài đăng
    useEffect(() => {
        const fetchData = async () => {
            const response = await articleAPI.getAPI();

            const data = response.data.splice(0, 3);
            setArticles(data);
        };
        fetchData();
    }, []);

    function getText(html) {
        var divContainer = document.createElement('div');
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || '';
    }

    return (
        <div>
            <h1 className="labelNews">Tin Tức</h1>
            <div className="news">
                {articles &&
                    articles.slice(0, 3).map((value) => (
                        <div
                            className="owl-item cloned"
                            // key={value.Article_id}
                            key={value.id}
                        >
                            {/* <Link to={`/detail/${value.Article_id}`} className="news_link"> */}
                            <Link to={`/detail/${value.id}`} className="news_link">
                                <div className="item">
                                    <img src={value.imageURL} className="news_img"></img>
                                    <div className="box">
                                        <h3>
                                            {/* <a className="title">{value.article_title}</a> */}
                                            <a className="title">{value.title}</a>
                                        </h3>
                                        {/* <div className="short-content">{value.article_content}</div> */}

                                        <div className="short-content">{getText(value.content)}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default News;

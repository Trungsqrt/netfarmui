import React from 'react';
import './Article.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Policy(props) {
    const { article } = props;
    return (
        <div>
            <div className="owl-item cloned" key={article.Article_id}>
                <Link to={`/detail/${article.Article_id}`} className="news_link">
                    <div className="item">
                        <img src={article.img} className="news_img"></img>
                        <div className="box">
                            <h3>
                                <a className="title">{article.article_title}</a>
                            </h3>
                            <div className="short-content">{article.article_content}</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Policy;

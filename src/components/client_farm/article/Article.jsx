import React, { useState } from 'react';
import './Article.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Article.propTypes = {
    articles: PropTypes.array,
};

Article.defaultProps = {
    articles: [],
};

function getText(html) {
    var divContainer = document.createElement('div');
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || '';
}

function Article(props) {
    const { article } = props;
    return (
        <div>
            <Link className="link_article" to={`/detail/${article.id}`}>
                <div className="article_item">
                    <img src={article.imageURL} className="article_img" />
                    <div className="article_text">
                        <div className="article_title">{article.title}</div>
                        <div className="article_tag">
                            <div className="article_category">{article.aCategoryName}</div>
                            <div className="article_category">{article.datePost}</div>
                        </div>
                        <div className="article_content">{getText(article.content)}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Article;

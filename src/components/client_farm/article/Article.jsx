import React from 'react';
import './Article.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Article.propTypes = {
    articles: PropTypes.array,
};

Article.defaultProps = {
    articles: [],
};
function Article(props) {
    const { articles } = props;
    return (
        <div>
            <Link className="link_article" to={`/tintuc/${article.Article_id}`}>
                <div class="article_item">
                    <img src={article.image} className="article_img" />
                    <div class="article_text">
                        <div class="article_title">{article.article_title}</div>
                        <div class="article_content">{article.article_content}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Article;

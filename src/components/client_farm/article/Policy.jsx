import React from 'react';
import './Article.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Policy(props) {
    const { article } = props;

    function getText(html) {
        var divContainer = document.createElement('div');
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || '';
    }

    return (
        <div className="owl-item cloned" key={article.id}>
            <Link to={`/detail/${article.id}`} className="news_link">
                <div className="item">
                    <img src={article.imageURL} className="news_img"></img>
                    <div className="box">
                        <h3>
                            <a className="title">{article.title}</a>
                        </h3>
                        <div className="short-content">{getText(article.content)}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Policy;

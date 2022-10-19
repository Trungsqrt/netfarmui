import React, { useEffect } from "react";
import "./Article.css";
import { Link, Route, Routes } from "react-router-dom";
import DetailArticle from "./News/DetailArticle";

const Article = (props) => {
  const { article, number } = props;
  useEffect(() => {
    console.log(article);
    console.log(props);
  }, []);
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
      <Routes>
        <Route
          path="/tintuc/:id"
          element={<DetailArticle article={article} />}
        />
      </Routes>
    </div>
  );
};

export default Article;

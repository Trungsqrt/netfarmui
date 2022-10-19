import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetaillArticle.css";
import Menuleft from "./Menuleft";
import Footer from "../../footer/Footer";
import Navbar from "../../navbar/Navbar";
const DetailArticle = (props) => {
  let { id } = useParams();
  const [article, setArticle] = useState();
  useEffect(() => {
    fetch("https://634923a80b382d796c7e7f52.mockapi.io/api/article")
      .then((res) => res.json())
      .then((json) => {
        let currentArticle;
        json.map((article) => {
          if (article.Article_id == id) {
            currentArticle = article;
          }
        });
        setArticle(currentArticle);
      });
  }, []);
  useEffect(() => {
    console.log(article);
  }, [article]);
  return (
    <div>
      <div className="wrapper">
        {article && (
          <div>
            <Navbar></Navbar>
            <div className="Banner"></div>
            <div className="main">
              <div className="column-left">
                <Menuleft></Menuleft>
              </div>
              <div className="column-right">
                <div className="detail_wrapper">
                  <h1 className="title">{article.article_title}</h1>
                  <div>
                    <img src={article.image} className="article_img"></img>
                    <div className="line"></div>
                    <div className="content">{article.article_content}</div>
                  </div>
                </div>
              </div>
            </div>
            <Footer></Footer>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailArticle;

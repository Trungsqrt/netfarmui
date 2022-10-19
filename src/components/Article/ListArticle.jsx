import React, { useEffect, useState } from "react";
import "./Article.css";
import Article from "./Article";

const ListArticle = (props) => {
  const [listArticle, setArticle] = useState();
  useEffect(() => {
    fetch("https://634923a80b382d796c7e7f52.mockapi.io/api/article")
      .then((res) => res.json())
      .then((json) => setArticle(json));
  }, []);
  return (
    <div>
      <div>
        <div class="listarticle">
          {listArticle
            ? listArticle
                .slice(0, 2)
                .map((item, index) => (
                  <Article
                    article={item}
                    key={item.id}
                    update={item.id}
                    number={index}></Article>
                ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default ListArticle;

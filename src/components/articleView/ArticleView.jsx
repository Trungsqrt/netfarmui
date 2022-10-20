import React from "react";

function ArticleView(article) {
   return (
      <div>
         abc
         {console.log(article)}
         {/* title */}
         <section>
            <h4>{article.title}</h4>
         </section>
         {/* content */}
         <section>{article.content}</section>
         {/* time */}
         <section>
            <p>{article.datePost}</p>
         </section>
      </div>
   );
}

export default ArticleView;

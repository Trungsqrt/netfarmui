import React from 'react'
import "./Article.css"
import { useEffect, useMemo, useState } from "react";
import Category from "./category.json"
const ListCategory = (props) => {

     const [listCategory, setarticleCategory] = useState();
        useEffect(() => {
        fetch('https://634923a80b382d796c7e7f52.mockapi.io/api/Category')
            .then((res) => res.json())
            .then((json) => setarticleCategory(json));
    }, []);
    const [listArticle, setArticle] = useState();
        useEffect(() => {
        fetch('https://634923a80b382d796c7e7f52.mockapi.io/api/article')
            .then((res) => res.json())
            .then((json) => setArticle(json));
    }, []);

    return (
        <select
          value={Category}
          onChange={(e) => setarticleCategory(e.target.value)}
        >
          {Category.map((option, i) => {
            return (
              <option value={option.category_id} key={i}>
                {option.category_name}
              </option>
            );
          })}
        </select>
      )
      
}

export default ListCategory
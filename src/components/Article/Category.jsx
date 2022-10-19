import React from 'react'
import "./Article.css"
import { useDispatch, useSelector } from "react-redux";
const Category = (props) => {
    const { category, number } = props;
    const dispatch = useDispatch();
    const movies = useMemo(() => {
      return allMovies.filter((movie) => {
        // return all movies when options All genre selected (genre value is "")
        if (genre === "") {
          return allMovies;
        }
        // if not an empty string, create an array of lowering case genre
        const movieGenre = movie.genre.map((val) => val.toLowerCase());
        // return movie if the genre is included in movieGenre
        return movieGenre.includes(genre);
      });
    }, [genre]);
  return (
    <div>
        <div>{category.category_id}</div>
        <div>{category.category_name}</div>
    </div>
  )
}



export default Category
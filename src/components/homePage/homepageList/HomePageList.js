import React from "react";
import { Link } from "react-router-dom";

const HomePageList = ({ movie }) => {
  return (
    <>
      <li className ='HomePageList'>
        <Link className='LinkList'
          to={{
            pathname: `/moviesSearch/${movie.id}`,
            state: { id: movie.id }
          }}
        >
          {" "}
          {movie.name || movie.title}
        </Link>
        <img className='smallImg' alt="unavailable"src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}/>
      </li>
    </>
  );
};
export default HomePageList;


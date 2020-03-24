import React from "react";
import { Link } from "react-router-dom";

const HomePageList = ({ movie }) => {
  return (
    <>
      <li>
        <Link
          to={{
            pathname: `/moviesSearch/${movie.id}`,
            state: { id: movie.id }
          }}
        >
          {" "}
          {movie.name || movie.title}
        </Link>
      </li>
    </>
  );
};
export default HomePageList;


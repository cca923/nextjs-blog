import { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMovieRequest, moviesSelector } from "../../../redux/movie-result";

import Card from "../Card";

import movieStyles from "../../../styles/movies.module.css";

function Result() {
  const movieData = useSelector(moviesSelector);

  return (
    <>
      {movieData.length !== 0 ? (
        <>
          {Array.isArray(movieData) ? (
            <section className={movieStyles.list}>
              {movieData.map((data) => {
                return <Card data={data} key={data.imdbID} />;
              })}
            </section>
          ) : (
            <div>{movieData}</div>
          )}
        </>
      ) : (
        <div>Enter something...</div>
      )}
    </>
  );
}

export default Result;

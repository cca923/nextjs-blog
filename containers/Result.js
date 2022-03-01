import { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMovieRequest, moviesSelector } from "../redux/movie-result";

import Card from "../components/Movie/Card";

import movieStyles from "../styles/movies.module.css";

function Result({ url }) {
  const dispatch = useDispatch();
  const movieData = useSelector(moviesSelector);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [movieData, setMovieData] = useState();

  useEffect(() => {
    if (url) {
      dispatch(fetchMovieRequest(url));

      // async function fetchMovieData() {
      //   setIsLoading(true);
      //   setIsError(false);
      //   try {
      //     const getMovieResponse = await fetch(url, {
      //       method: "GET",
      //     });
      //     const movieResult = await getMovieResponse.json();
      //     if (movieResult.Response === "True") {
      //       setMovieData(movieResult.Search);
      //     } else {
      //       setMovieData(movieResult.Error);
      //     }
      //   } catch (error) {
      //     setIsError(true);
      //   }
      //   setIsLoading(false);
      // }
      // fetchMovieData();
    }
  }, [url]);

  return (
    <>
      {url ? (
        <>
          <div>{console.log(movieData)}</div>
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
        </>
      ) : (
        <div>Enter something...</div>
      )}
    </>
  );
}

export default memo(Result);

import { useState, useEffect, memo } from "react";

import movieStyles from "../../../styles/movies.module.css";

function Result({ url }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    if (url) {
      async function fetchMovieData() {
        setIsLoading(true);
        setIsError(false);

        try {
          const getMovieResponse = await fetch(url, {
            method: "GET",
          });
          const movieResult = await getMovieResponse.json();

          if (movieResult.Response === "True") {
            setMovieData(movieResult.Search);
          } else {
            setMovieData(movieResult.Error);
          }
        } catch (error) {
          setIsError(true);
        }
        setIsLoading(false);
      }

      fetchMovieData();
    }
  }, [url]);

  return (
    <>
      {url ? (
        <>
          {isError && <div>Something went wrong...</div>}
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {Array.isArray(movieData) ? (
                <section className={movieStyles.list}>
                  {movieData.map((data) => {
                    return (
                      <div key={data.imdbID}>
                        <img
                          src={data.Poster}
                          alt="movie poster"
                          className={movieStyles.listImg}
                        />
                        <p className={movieStyles.listText}>{data.Title}</p>
                      </div>
                    );
                  })}
                </section>
              ) : (
                <div>{movieData}</div>
              )}
            </>
          )}
        </>
      ) : (
        <div>Enter something...</div>
      )}
    </>
  );
}

export default memo(Result);

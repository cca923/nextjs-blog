/* eslint-disable react/jsx-no-useless-fragment */
import { useSelector } from 'react-redux'

import { moviesSelector } from '../../../redux/toolkit/Movies/selector'

import Card from '../Card'

import movieStyles from '../../../styles/movies.module.css'

function Result() {
  const movieData = useSelector(moviesSelector)
  const { isLoading, sources, error } = movieData
  console.log(movieData)

  return (
    <>
      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <>
          {sources.length !== 0 ? (
            <>
              {error ? (
                <div>{error}</div>
              ) : (
                <>
                  {Array.isArray(movieData.sources) ? (
                    <section className={movieStyles.list}>
                      {movieData.sources.map((data) => <Card data={data} key={data.imdbID} />)}
                    </section>
                  ) : (
                    <div>{movieData.sources}</div>
                  )}
                </>
              )}
            </>
          ) : (
            <div>Enter something...</div>
          )}
        </>
      )}
    </>
  )
}

export default Result

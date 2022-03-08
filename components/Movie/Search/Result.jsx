/* eslint-disable react/jsx-no-useless-fragment */
import { useSelector } from 'react-redux'

import { moviesSelector } from '../../../redux/toolkit/Movies/selector'

import Card from '../Card'

import movieStyles from '../../../styles/movies.module.css'

function Result() {
  const movies = useSelector(moviesSelector)
  const { isLoading, sources, error } = movies

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
                  {Array.isArray(sources) ? (
                    <section className={movieStyles.list}>
                      {sources.map((data) => <Card data={data} key={data.imdbID} />)}
                    </section>
                  ) : (
                    <div>{sources}</div>
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

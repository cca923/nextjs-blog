import movieStyles from '../../styles/movies.module.css'

export default function Card({ data }) {
  return (
    <div>
      <img
        src={data.Poster}
        alt="movie poster"
        className={movieStyles.listImg}
      />
      <p className={movieStyles.listText}>{data.Title}</p>
    </div>
  )
}

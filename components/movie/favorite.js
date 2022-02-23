import movieStyles from "../../styles/movies.module.css";

export default function Favorite({ harryPotterData }) {
  return (
    <>
      <section className={movieStyles.list}>
        {harryPotterData.Search.slice(0, 3).map(({ imdbID, Poster, Title }) => {
          return (
            <div key={imdbID}>
              <img
                src={Poster}
                alt="movie poster"
                className={movieStyles.listImg}
              />
              <p className={movieStyles.listText}>{Title}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}

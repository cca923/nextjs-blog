import Card from './Card'

import movieStyles from '../../styles/movies.module.css'

export default function Favorite({ harryPotterData }) {
  return (
    <section className={movieStyles.list}>
      {harryPotterData.Search.slice(0, 3).map((data) => <Card data={data} key={data.imdbID} />)}
    </section>
  )
}

import { fetchMovies } from "../../apis/service";

import Layout from "../../components/Layout";
import Favorite from "../../components/Movie/Favorite";
import Search from "../../components/Movie/Search";

import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps() {
  const harryPotterRes = await fetchMovies({ name: "Harry+Potter" });
  const harryPotterData = await harryPotterRes.json();

  return { props: { harryPotterData } };
}

export default function MoviesPage({ harryPotterData }) {
  return (
    <Layout>
      <h2 className={utilStyles.headingXl}>My Favorite Movie</h2>
      <Favorite harryPotterData={harryPotterData} />

      <h2 className={utilStyles.headingXl}>Movie Search</h2>
      <Search />
    </Layout>
  );
}

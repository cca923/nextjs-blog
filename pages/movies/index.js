import Layout from "../../components/Layout";
import Favorite from "../../components/Movie/Favorite";
import Search from "../../components/Movie/Search";

import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps() {
  const res = await fetch(
    "http://www.omdbapi.com/?s=Harry+Potter&apikey=8efdf7b9",
    {
      method: "GET",
    }
  );
  const harryPotterData = await res.json();
  return { props: { harryPotterData } };
}

export default function Movies({ harryPotterData }) {
  return (
    <Layout>
      <h2 className={utilStyles.headingXl}>My Favorite Movie</h2>
      <Favorite harryPotterData={harryPotterData} />

      <h2 className={utilStyles.headingXl}>Movie Search</h2>
      <Search />
    </Layout>
  );
}

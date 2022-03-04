import { fetchPassenger } from "../../apis/service";

import Layout from "../../components/Layout";

import Passengers from "../../container/Passengers";

export async function getStaticProps() {
  let currentIndex = { page: 0, size: 10 };
  const passengerRes = await fetchPassenger(currentIndex);
  const passengerData = await passengerRes.json();

  return { props: { passengerData, currentIndex } };
}

export default function PassengersPage({ passengerData, currentIndex }) {
  return (
    <Layout>
      <Passengers passengerData={passengerData} currentIndex={currentIndex} />
    </Layout>
  );
}

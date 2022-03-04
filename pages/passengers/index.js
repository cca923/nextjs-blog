import { fetchPassenger } from "../../apis/service";
import Layout from "../../components/Layout";

export async function getStaticProps() {
  const passengerRes = await fetchPassenger(0, 10);
  const passengerData = await passengerRes.json();
  console.log(passengerData);

  return { props: { passengerData } };
}

export default function Passengers({ passengerData }) {
  return (
    <Layout>
      <div></div>
    </Layout>
  );
}

import { useDispatch } from 'react-redux'

import { fetchPassenger } from '../../apis/service'

import Layout from '../../components/Layout'

import Passengers from '../../container/Passengers'

import { fetchPassengersRequest } from '../../redux/toolkit/Passengers/slice'

export async function getStaticProps() {
  const currentIndex = { page: 0, size: 10 }

  // dispatch(fetchPassengersRequest(currentIndex))

  const passengerRes = await fetchPassenger(currentIndex)
  const passengerData = await passengerRes.json()

  return { props: { passengerData, currentIndex } }
}

export default function PassengersPage({ passengerData, currentIndex }) {
  return (
    <Layout>
      <Passengers passengerData={passengerData} currentIndex={currentIndex} />
    </Layout>
  )
}

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchPassenger } from '../../apis/service'

import Layout from '../../components/Layout'

import Passengers from '../../container/Passengers'
import { wrapper } from '../../redux/store'

import { fetchPassengersRequest } from '../../redux/toolkit/Passengers/slice'

// export const getStaticProps = wrapper.getStaticProps((store) => async ({ req, res }) => {
//   const currentIndex = { page: 0, size: 10 }
//   store.dispatch(fetchPassengersRequest(currentIndex))
// })

export default function PassengersPage() {
  return (
    <Layout>
      <Passengers />
    </Layout>
  )
}

// export async function getStaticProps() {
//   const currentIndex = { page: 0, size: 10 }
//   const passengerRes = await fetchPassenger(currentIndex)
//   const passengerData = await passengerRes.json()

//   return { props: { passengerData, currentIndex } }
// }

// export default function PassengersPage({ passengerData, currentIndex }) {
//   return (
//     <Layout>
//       <Passengers passengerData={passengerData} currentIndex={currentIndex} />
//     </Layout>
//   )
// }

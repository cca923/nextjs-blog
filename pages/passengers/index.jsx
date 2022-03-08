import Layout from '../../components/Layout'

import Passengers from '../../container/Passengers'

import { wrapper } from '../../redux/store'
import { fetchPassengersRequest } from '../../redux/toolkit/Passengers/slice'

// ----- getStaticProps fetch (With next-redux-wrapper) ----- //
export const getStaticProps = wrapper.getStaticProps((store) => async ({ req, res }) => {
  const { passengers } = store.getState()
  const { page, size } = passengers
  store.dispatch(fetchPassengersRequest({ page, size }))
})

export default function PassengersPage() {
  return (
    <Layout>
      <Passengers />
    </Layout>
  )
}

// ----- getStaticProps fetch (No Redux) ----- //
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

import { StateObservable } from 'redux-observable'
import { lastValueFrom, of, Subject } from 'rxjs'

import Layout from '../../components/Layout'

import Passengers from '../../container/Passengers'

import { rootEpic } from '../../redux/root'
import { wrapper } from '../../redux/store'
import { fetchPassengersRequest } from '../../redux/toolkit/Passengers/slice'

// ----- getStaticProps fetch (With next-redux-wrapper) ----- //
export const getStaticProps = wrapper.getStaticProps((store) => async ({ req, res }) => {
  const { passengers } = store.getState()
  const { page, size } = passengers

  const state$ = new StateObservable(new Subject(), store.getState())
  // eslint-disable-next-line max-len
  const fetchPassengersRequestAction = await lastValueFrom(rootEpic(of(fetchPassengersRequest({ page, size })), state$, {}))
  store.dispatch(fetchPassengersRequestAction)
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

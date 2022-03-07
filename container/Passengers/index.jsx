import { useState } from 'react'
import { Waypoint } from 'react-waypoint'
import styled from 'styled-components'

import { fetchPassenger } from '../../apis/service'

import Loading from '../../components/Loading'
import PassengerCard from '../../components/Passengers/PassengerCard'

const PassengersWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  padding: 1rem;
`

export default function Passengers({ passengerData, currentIndex }) {
  const { data, totalPages } = passengerData
  // const { currentPage } = currentIndex

  const [passengers, setPassengers] = useState(data)
  const [isLoading, setIsLoading] = useState(false)

  async function loadMore() {
    setIsLoading(true)

    const passengerRes = await fetchPassenger({
      currentPage: ++currentIndex.currentPage,
      size: 10,
    })
    const passengerData = await passengerRes.json()
    setPassengers((prePassenger) => [...prePassenger, ...passengerData.data])

    setIsLoading(false)
  }

  return (
    <>
      <PassengersWrap>
        {/* 把 Card 裡面 Passenger 的部分拿出來寫，比較乾淨，還可以重複利用，用外面決定 Card 尺寸 */}
        {passengers.map((data) => (
          // eslint-disable-next-line no-underscore-dangle
          <PassengerCard data={data} key={data._id} />
        ))}

        {!isLoading && (
          <Waypoint
            onEnter={
              totalPages > 1 && currentIndex.currentPage !== totalPages && loadMore
            }
          />
        )}
      </PassengersWrap>

      {isLoading && <Loading />}
    </>
  )
}

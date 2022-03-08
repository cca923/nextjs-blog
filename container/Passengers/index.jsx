import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Waypoint } from 'react-waypoint'
import styled from 'styled-components'

import Loading from '../../components/Loading'
import PassengerCard from '../../components/Passengers/PassengerCard'

import { passengersSelector, passengersHasMoreSelector } from '../../redux/toolkit/Passengers/selector'
import { fetchPassengersRequest } from '../../redux/toolkit/Passengers/slice'

const PassengersWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  padding: 1rem;
`

export default function Passengers() {
  const dispatch = useDispatch()
  const passengerData = useSelector(passengersSelector)
  const hasMore = useSelector(passengersHasMoreSelector)

  const {
    isLoading, page, size, data, error,
  } = passengerData

  console.log(passengerData)

  // const [index, setIndex] = useState({ page, size })

  useEffect(() => {
    dispatch(fetchPassengersRequest({ page, size }))
  }, [])

  function loadMore() {
    if (hasMore) {
      dispatch(fetchPassengersRequest({ page: page + 1, size }))
    }
  }

  return (

    <>
      <PassengersWrap>
        {/* 把 Card 裡面 data 的部分拿出來寫，比較乾淨，還可以重複利用 Card，用外面決定 Card 尺寸 */}
        {data.map((data) => (
          // eslint-disable-next-line no-underscore-dangle
          <PassengerCard data={data} key={data._id} />
        ))}

        {error ? <div>{error}</div>
          : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {!isLoading && (
              // eslint-disable-next-line react/jsx-no-bind
              <Waypoint onEnter={loadMore} />
              )}
            </>
          )}
      </PassengersWrap>

      {isLoading && <Loading />}
    </>
  )
}

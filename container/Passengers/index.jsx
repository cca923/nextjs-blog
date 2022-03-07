import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Waypoint } from 'react-waypoint'
import styled from 'styled-components'

import Loading from '../../components/Loading'
import PassengerCard from '../../components/Passengers/PassengerCard'
import { passengersSelector } from '../../redux/toolkit/Passengers/selector'
import { fetchPassengersRequest } from '../../redux/toolkit/Passengers/slice'

const PassengersWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  padding: 1rem;
`

export default function Passengers() {
  const initialIndex = { page: 0, size: 10 }
  const [index, setIndex] = useState(initialIndex)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPassengersRequest(index))
  }, [index.page])

  const passengerData = useSelector(passengersSelector)

  const {
    isLoading, page, totalPages, data, error,
  } = passengerData

  console.log(error)

  function loadMore() {
    if (totalPages > 1 && page !== totalPages) {
      setIndex({ ...index, page: page + 1 })
    }
  }

  return (

    <>
      <PassengersWrap>
        {/* 把 Card 裡面 Passenger 的部分拿出來寫，比較乾淨，還可以重複利用，用外面決定 Card 尺寸 */}
        {data.map((data) => (
          // eslint-disable-next-line no-underscore-dangle
          <PassengerCard data={data} key={data._id} />
        ))}

        {error ? <div>{error}</div>
          : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {!isLoading && (
              <Waypoint onEnter={() => loadMore()} />
              )}
            </>
          )}

      </PassengersWrap>

      {isLoading && <Loading />}
    </>
  )
}

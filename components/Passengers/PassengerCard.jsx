import { memo } from 'react'
import styled from 'styled-components'

const PassengerCardWrap = styled.div`
  background-color: aliceblue;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
`

const Name = styled.div`
  padding: 0.5rem;
  text-align: center;
`

const AirlineWrap = styled.div`
  background-color: white;
  height: 100%;
  padding: 0.5rem;
  border: 2px solid #a2d2ff;
  border-radius: 0 0 1rem 1rem;
`

const Detail = styled.li`
  font-size: 0.8rem;
  color: #343a40;
`

function PassengerCard({ data }) {
  return (
    <PassengerCardWrap>
      <Name>{data.name}</Name>
      <AirlineWrap>
        {data.airline.map((airline) => (
          <div key={airline.id}>
            <div>{airline.name}</div>
            <Detail>{airline.slogan}</Detail>
            <Detail>{airline.website}</Detail>
          </div>
        ))}
      </AirlineWrap>
    </PassengerCardWrap>
  )
}

export default memo(PassengerCard)

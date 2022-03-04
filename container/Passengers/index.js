import { useState } from "react";
import { Waypoint } from "react-waypoint";
import styled from "styled-components";

import { fetchPassenger } from "../../apis/service";

import Loading from "../../components/Loading";
import Card from "../../components/Passengers/Card";

const PassengersWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  padding: 1rem;
`;

export default function Passengers({ passengerData, currentIndex }) {
  const { data, totalPages } = passengerData;
  const [passengers, setPassengers] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  //   console.log(passengers);
  //   console.log(currentIndex.page);

  async function loadMore() {
    setIsLoading(true);

    const passengerRes = await fetchPassenger({
      page: ++currentIndex.page,
      size: 10,
    });
    const passengerData = await passengerRes.json();
    setPassengers((prePassenger) => [...prePassenger, ...passengerData.data]);

    setIsLoading(false);
  }

  return (
    <>
      <PassengersWrap>
        <Card passengers={passengers} />
        {!isLoading && (
          <Waypoint
            onEnter={
              totalPages > 1 && currentIndex.page !== totalPages && loadMore
            }
          />
        )}
      </PassengersWrap>

      {isLoading && <Loading />}
    </>
  );
}

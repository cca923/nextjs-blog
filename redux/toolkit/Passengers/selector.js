import { createSelector } from '@reduxjs/toolkit'

export const passengersSelector = (state) => state.passengers

export const passengersHasMoreSelector = createSelector(
  [passengersSelector],
  (passengers) => {
    const { page, totalPages } = passengers
    return totalPages > 1 && page + 1 !== totalPages
  },
)

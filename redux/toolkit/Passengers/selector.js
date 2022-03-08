import { createSelector } from '@reduxjs/toolkit'

export const passengersSelector = (state) => state.passengers

export const passengersHasMoreSelector = createSelector(
  [passengersSelector],
  (passengersData) => {
    const { page, totalPages } = passengersData
    return totalPages > 1 && page + 1 !== totalPages
  },
)

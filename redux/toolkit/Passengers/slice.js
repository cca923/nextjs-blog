import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  page: 0,
  size: 10,
  totalPages: 0,
  hasMore: false,
  data: [],
  error: null,
}

export const passengersSlice = createSlice({
  name: 'passengers',
  initialState,
  reducers: {
    fetchPassengersRequest: (state) => {
      state.isLoading = true
      state.error = null
    },
    fetchPassengersSuccess: (state, action) => {
      const {
        page, size, totalPages, data,
      } = action.payload

      state.isLoading = false
      state.page = page
      state.size = size

      if (totalPages > 1 && page + 1 !== totalPages) {
        state.hasMore = true
      } else {
        state.hasMore = false
      }

      state.data = [...state.data, ...data]
    },
    fetchPassengersFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    fetchPassengersCancelled: () => initialState,
  },
})

export const {
  fetchPassengersRequest,
  fetchPassengersSuccess,
  fetchPassengersFailure,
  fetchPassengersCancelled,
} = passengersSlice.actions

export default passengersSlice.reducer

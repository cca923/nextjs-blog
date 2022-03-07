import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  sources: [],
  error: null,
}

export const passengersSlice = createSlice({
  name: 'passengers',
  initialState,
  reducers: {
    fetchPassengersRequest: (state, action) => {
      state.isLoading = true
      state.sources = action.payload
      state.error = null
    },
    fetchPassengersSuccess: (state, action) => {
      state.isLoading = false
      state.sources = [...state.sources, ...action.payload]
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

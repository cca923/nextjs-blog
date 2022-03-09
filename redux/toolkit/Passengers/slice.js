import { createAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const hydrate = createAction(HYDRATE)

const initialState = {
  isLoading: false,
  page: 0,
  size: 10,
  totalPages: 0,
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
      state.totalPages = totalPages
      state.data = [...state.data, ...data]
    },
    fetchPassengersFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    fetchPassengersCancelled: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => ({
      ...state,
      ...action.payload.passengers,
    }))
  },
})

export const {
  fetchPassengersRequest,
  fetchPassengersSuccess,
  fetchPassengersFailure,
  fetchPassengersCancelled,
} = passengersSlice.actions

export default passengersSlice.reducer

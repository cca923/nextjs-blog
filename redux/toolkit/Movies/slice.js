import { createSlice } from '@reduxjs/toolkit'

// ----- reduxjs/toolkit ----- //
// slice
const initialState = {
  isLoading: false,
  sources: [],
  error: null,
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchMovieRequest: (state) => {
      state.isLoading = true
      state.sources = []
      state.error = null
    },
    fetchMovieSuccess: (state, action) => {
      state.isLoading = false
      state.sources = action.payload
    },
    fetchMovieFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    fetchMovieCancelled: () => initialState,
  },
})
// console.log(moviesSlice); // return Object

// 從 slice 中拿出 action creator
export const {
  fetchMovieRequest,
  fetchMovieSuccess,
  fetchMovieFailure,
  fetchMovieCancelled,
} = moviesSlice.actions

// Export the reducer
export default moviesSlice.reducer

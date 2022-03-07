import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'

// import { fetchMovieEpic, moviesReducer } from "./no-toolkit/movie-result"; // No reduxjs/toolkit
import { fetchMovieEpic } from './toolkit/Movies/epic' // reduxjs/toolkit
import moviesSlice from './toolkit/Movies/slice' // reduxjs/toolkit
import passengersSlice from './toolkit/Passengers/slice'

export const rootEpic = combineEpics(fetchMovieEpic)

// ----- No reduxjs/toolkit ----- //
// export const rootReducer = combineReducers({
//   movies: moviesReducer,
// });

// ----- reduxjs/toolkit ----- //
export const rootReducer = combineReducers({
  movies: moviesSlice,
  passengers: passengersSlice,
})

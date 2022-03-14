import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'

// import { fetchMovieEpic, moviesReducer } from "./no-toolkit/movie-result"; // No reduxjs/toolkit
import { fetchMovieEpic } from './toolkit/Movies/epic' // reduxjs/toolkit
import moviesSlice from './toolkit/Movies/slice' // reduxjs/toolkit

import { fetchPassengersEpic } from './toolkit/Passengers/epic'
import passengersSlice from './toolkit/Passengers/slice'

import { socketChatEpic } from './toolkit/Socket-chat/epic'
import socketChatSlice from './toolkit/Socket-chat/slice'

import userInfoSlice from './toolkit/User/slice'

export const rootEpic = combineEpics(fetchMovieEpic, fetchPassengersEpic, socketChatEpic)

// ----- No reduxjs/toolkit ----- //
// export const rootReducer = combineReducers({
//   movies: moviesReducer,
// });

// ----- reduxjs/toolkit ----- //
export const rootReducer = combineReducers({
  movies: moviesSlice,
  passengers: passengersSlice,
  socketChat: socketChatSlice,
  userInfo: userInfoSlice,
})

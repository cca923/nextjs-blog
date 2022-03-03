import { combineEpics } from "redux-observable";
import { combineReducers } from "redux";

// import { fetchMovieEpic, moviesReducer } from "./no-toolkit/movie-result"; // No reduxjs/toolkit
import { fetchMovieEpic } from "./toolkit/epic"; // reduxjs/toolkit
import moviesSlice from "./toolkit/slice"; // reduxjs/toolkit

export const rootEpic = combineEpics(fetchMovieEpic);

// ----- No reduxjs/toolkit ----- //
// export const rootReducer = combineReducers({
//   movies: moviesReducer,
// });

// ----- reduxjs/toolkit ----- //
export const rootReducer = combineReducers({
  movies: moviesSlice,
});

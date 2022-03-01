import { combineEpics } from "redux-observable";
import { combineReducers } from "redux";

import { fetchMovieEpic, moviesReducer } from "./movie-result";

export const rootEpic = combineEpics(fetchMovieEpic);

export const rootReducer = combineReducers({
  movies: moviesReducer,
});

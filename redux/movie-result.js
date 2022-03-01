import { ofType } from "redux-observable";
import { of, from } from "rxjs";

import { switchMap, catchError, map } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

// types
const FETCH_MOVIE_REQUEST = "FETCH_MOVIE_REQUEST";
const FETCH_MOVIE_SUCCESS = "FETCH_MOVIE_SUCCESS";
const FETCH_MOVIE_FAILURE = "FETCH_MOVIE_FAILURE";

// actions
export const fetchMovieRequest = (payload) => ({
  type: FETCH_MOVIE_REQUEST,
  payload,
});

const fetchMovieSuccess = (payload) => ({
  type: FETCH_MOVIE_SUCCESS,
  payload,
});

const fetchMovieFailure = (payload) => ({
  type: FETCH_MOVIE_FAILURE,
  payload,
});

// epics
export const fetchMovieEpic = (action$) =>
  action$.pipe(
    ofType(FETCH_MOVIE_REQUEST),
    switchMap((action) =>
      // ajax({
      //   url: action.payload,
      //   method: "GET",
      //   headers: {
      //     origin: "http://localhost:3000",
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "*",
      //   },
      // })

      // ajax
      //   .getJSON(action.payload)

      from(
        fetch(action.payload, {
          method: "GET",
        }).then(async (res) => await res.json())
      ).pipe(
        map((response) => {
          if (response.Response === "True") {
            return fetchMovieSuccess(response?.Search);
          } else {
            return fetchMovieSuccess(response?.Error);
          }
        }),
        catchError((err) => of(fetchMovieFailure(err.message)))
      )
    ),
    catchError((err) => of(fetchMovieFailure(err.message)))
  );

// reducers
export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_MOVIE_REQUEST:
      return "Loading...";

    case FETCH_MOVIE_SUCCESS:
      return action.payload;

    case FETCH_MOVIE_FAILURE:
      return action.payload;

    default:
      return state;
  }
};

// selectors
export const moviesSelector = (state) => state.movies;

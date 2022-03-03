import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { switchMap, map, takeUntil, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

// ----- No reduxjs/toolkit ----- //
// types
const FETCH_MOVIE_REQUEST = "FETCH_MOVIE_REQUEST";
const FETCH_MOVIE_SUCCESS = "FETCH_MOVIE_SUCCESS";
const FETCH_MOVIE_FAILURE = "FETCH_MOVIE_FAILURE";
const FETCH_MOVIE_CANCELLED = "FETCH_MOVIE_CANCELLED";

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

export const fetchMovieCancelled = () => ({
  type: FETCH_MOVIE_CANCELLED,
});

// epics
export const fetchMovieEpic = (action$) =>
  action$.pipe(
    ofType(FETCH_MOVIE_REQUEST),
    switchMap((action) =>
      // ajax.getJSON(action.payload) // CORS issue
      from(
        fetch(action.payload, {
          method: "GET",
        })
      )
        .pipe(switchMap((res) => res.json()))
        .pipe(
          map((response) => {
            return fetchMovieSuccess(
              response?.Response === "True" ? response?.Search : response?.Error
            );
          }),
          takeUntil(action$.pipe(ofType(FETCH_MOVIE_CANCELLED))),
          catchError((err) => of(fetchMovieFailure(err.message)))
        )
    ),
    catchError((err) => of(fetchMovieFailure(err.message)))
  );

// reducers
const defaultState = [];

export const moviesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_MOVIE_REQUEST:
      return "Loading...";

    case FETCH_MOVIE_SUCCESS:
      return action.payload;

    case FETCH_MOVIE_FAILURE:
      return action.payload;

    case FETCH_MOVIE_CANCELLED:
      return defaultState;

    default:
      return state;
  }
};

// selectors
export const moviesSelector = (state) => state.movies;

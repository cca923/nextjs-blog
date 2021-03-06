import { ofType } from 'redux-observable'
import { of, from } from 'rxjs'
import {
  switchMap, map, takeUntil, catchError,
} from 'rxjs/operators'
// import { ajax } from 'rxjs/ajax'

import {
  fetchMovieRequest,
  fetchMovieSuccess,
  fetchMovieFailure,
  fetchMovieCancelled,
} from './slice'

import { fetchMovies } from '../../../apis/service'

// epics
export const fetchMovieEpic = (action$) => action$.pipe(
  ofType(fetchMovieRequest.type),
  switchMap((action) => from(fetchMovies({ name: action.payload }))
    // ajax.getJSON(action.payload) // CORS issue
    .pipe(switchMap((res) => res.json()))
    .pipe(
      map((response) => fetchMovieSuccess(
        response?.Response === 'True' ? response?.Search : response?.Error,
      )),
      takeUntil(action$.pipe(ofType(fetchMovieCancelled.type))),
      catchError((err) => of(fetchMovieFailure(err.message))),
    )),
  catchError((err) => of(fetchMovieFailure(err.message))),
)

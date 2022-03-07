import { ofType } from 'redux-observable'
import { of, from } from 'rxjs'
import {
  switchMap, map, takeUntil, catchError,
} from 'rxjs/operators'
// import { ajax } from 'rxjs/ajax'

import {
  fetchPassengersRequest,
  fetchPassengersSuccess,
  fetchPassengersFailure,
  fetchPassengersCancelled,
} from './slice'

import { fetchPassenger } from '../../../apis/service'

// epics
export const fetchMovieEpic = (action$) => action$.pipe(
  ofType(fetchPassengersRequest.type),
  switchMap((action) => from(fetchPassenger({ page: action.payload.page, size: action.payload.size }))
    // ajax.getJSON(action.payload) // CORS issue
    .pipe(switchMap((res) => res.json()))
    .pipe(
      map((response) => fetchPassengersSuccess(response.data)),
      takeUntil(action$.pipe(ofType(fetchPassengersCancelled.type))),
      catchError((err) => of(fetchPassengersFailure(err.message))),
    )),
  catchError((err) => of(fetchPassengersFailure(err.message))),
)

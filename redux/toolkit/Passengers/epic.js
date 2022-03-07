import { ofType } from 'redux-observable'
import { of, from } from 'rxjs'
import {
  switchMap, map, takeUntil, catchError,
} from 'rxjs/operators'

import {
  fetchPassengersRequest,
  fetchPassengersSuccess,
  fetchPassengersFailure,
  fetchPassengersCancelled,
} from './slice'

import { fetchPassenger } from '../../../apis/service'

// epics
export const fetchPassengersEpic = (action$) => action$.pipe(
  ofType(fetchPassengersRequest.type),
  switchMap((action) => from(fetchPassenger({ page: action.payload.page, size: action.payload.size }))
    .pipe(switchMap((res) => res.json()))
    .pipe(
      map((response) => {
        const { data, totalPages } = response
        const { page, size } = action.payload
        return fetchPassengersSuccess({
          data, totalPages, page, size,
        })
      }),
      takeUntil(action$.pipe(ofType(fetchPassengersCancelled.type))),
      catchError((err) => of(fetchPassengersFailure(err.message))),
    )),
  catchError((err) => of(fetchPassengersFailure(err.message))),
)

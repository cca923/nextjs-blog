import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { userInfoSelector } from '../User/selector'

import {
  sendChatMessage,
  appendChatMessage,
} from './slice'

export const socketChatEpic = (action$, state$) => action$.pipe(
  ofType(sendChatMessage.type),
  mergeMap((action) => {
    const { msg } = action.payload
    const userInfo = userInfoSelector(state$.value)

    return of(appendChatMessage({
      ...userInfo,
      msg,
      at: new Date().getTime(),
    }))
  }),
)

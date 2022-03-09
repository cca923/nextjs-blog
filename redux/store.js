// import { createStore, applyMiddleware } from 'redux' // No reduxjs/toolkit
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { createEpicMiddleware } from 'redux-observable'

import { rootEpic, rootReducer } from './root'

// ----- No reduxjs/toolkit ----- //
// export default function configureStore() {
//   const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

//   epicMiddleware.run(rootEpic);

//   return store;
// }

// ----- reduxjs/toolkit ----- //

export const initStore = () => {
  const epicMiddleware = createEpicMiddleware()

  const store = configureStore({
    reducer: rootReducer,
    middleware: [epicMiddleware],
  })

  epicMiddleware.run(rootEpic)

  return store
}

export const wrapper = createWrapper(initStore, { debug: false })

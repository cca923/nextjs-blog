import { createStore, applyMiddleware } from "redux"; // No reduxjs/toolkit
import { configureStore } from "@reduxjs/toolkit";

import { createEpicMiddleware } from "redux-observable";
import { rootEpic, rootReducer } from "./root";

const epicMiddleware = createEpicMiddleware();

// ----- No reduxjs/toolkit ----- //
// export default function configureStore() {
//   const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

//   epicMiddleware.run(rootEpic);

//   return store;
// }

// ----- reduxjs/toolkit ----- //
const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);

export default store;

import { applyMiddleware, createStore, Store, Middleware } from "redux";
import createSagaMiddleware, { SagaMiddleware, Task } from "redux-saga";
import { createWrapper, Context } from "next-redux-wrapper";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

export interface SagaStore extends Store<any, any> {
  sagaTask: Task;
}
const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    bindMiddleware([thunk, sagaMiddleware])
  );

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });

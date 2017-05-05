import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducer } from '../reducers/main.js';

export default function configureStore() {
  const store = createStore(
    reducer,
    /* -- initialState HERE --*/
    undefined,
    // Middlewares
    compose(
      applyMiddleware(thunk),
    )
  );

  return store;
}

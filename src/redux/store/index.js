import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from '../reducers';

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

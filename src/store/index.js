import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as api from '../services/triviaApi';
import rootReducer from './ducks';

const store = createStore(
  rootReducer,
  composeWithDevTools(thunk.withExtraArgument(api)),
);

export default store;

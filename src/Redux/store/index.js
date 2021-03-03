import { createStore, combineReducers } from 'redux';
import { playerReducer } from '../reducers';

const rootReducer = combineReducers({
  player: playerReducer,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

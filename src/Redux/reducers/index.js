import { combineReducers } from 'redux';
import login from './login';
import fetchAPI from './fetch';

const rootReducer = combineReducers({
  login,
  fetchAPI,
});

export default rootReducer;

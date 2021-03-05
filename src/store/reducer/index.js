import { combineReducers } from 'redux';
import loginReducer from './login';
import fetchReducer from './fetchApi';

const rootReducer = combineReducers({
  login: loginReducer,
  question: fetchReducer,
});

export default rootReducer;

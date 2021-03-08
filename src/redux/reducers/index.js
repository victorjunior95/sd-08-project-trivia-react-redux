import { combineReducers } from 'redux';

import login from './login';
import triviaReducer from './triviaReducer';

const rootReducers = combineReducers({
  login,
  triviaReducer,
});

export default rootReducers;

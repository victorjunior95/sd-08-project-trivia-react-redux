import { combineReducers } from 'redux';
import login from './login';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
  login,
  tokenReducer,
});

export default rootReducer;

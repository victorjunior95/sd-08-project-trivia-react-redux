import { combineReducers } from 'redux';
import loginReducer from './Login';
import gameReducer from './Game';

const rootReducer = combineReducers({
  login: loginReducer,
  game: gameReducer,
});

export default rootReducer;

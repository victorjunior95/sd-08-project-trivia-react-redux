import { combineReducers } from 'redux';
import loginReducer from './Login';
import gameReducer from './Game';
import scoreReducer from './Score';

const rootReducer = combineReducers({
  login: loginReducer,
  game: gameReducer,
  score: scoreReducer,
});

export default rootReducer;

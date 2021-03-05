import { combineReducers } from 'redux';

import player from './player.reducer';
import questions from './questions.reducer';

const rootReducer = combineReducers({
  player,
  questions,
});

export default rootReducer;

import { combineReducers } from 'redux';

import game from './game';
import user from './user';
import timer from './timer';

export default combineReducers({
  game,
  user,
  timer,
});

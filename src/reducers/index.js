import { combineReducers } from 'redux';
import getTokenReducer from './getToken';
import setUser from './setUser';
import score from './score';
import getQuestions from './getQuestions';
import stopTimer from './stopTimer';

const rootReducers = combineReducers({
  getTokenReducer,
  setUser,
  score,
  getQuestions,
  stopTimer,
});

export default rootReducers;

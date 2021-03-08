import { combineReducers } from 'redux';
import user from './user';
import player from './player';
import questions from './questions';

const rootReducer = combineReducers({ user, questions, player });
export default rootReducer;

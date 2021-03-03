import { combineReducers } from 'redux';
import getTokenReducer from './getToken';
import setUser from './setUser';
import score from './score';
import getQuestions from './getQuestions';

const rootReducers = combineReducers({ getTokenReducer, setUser, score, getQuestions });

export default rootReducers;

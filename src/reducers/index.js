import { combineReducers } from 'redux';
import getTokenReducer from './getToken';
import setUser from './setUser';
import score from './score';

const rootReducers = combineReducers({ getTokenReducer, setUser, score });

export default rootReducers;

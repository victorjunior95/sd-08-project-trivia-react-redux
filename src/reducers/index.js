import { combineReducers } from 'redux';
import getTokenReducer from './getToken';

const rootReducers = combineReducers({ getTokenReducer });

export default rootReducers;

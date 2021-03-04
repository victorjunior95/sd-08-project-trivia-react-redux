import { combineReducers } from 'redux';
import perguntasReducer from './perguntasReducer';
import reqApiReducer from './reqApiReducer';

const rootReducers = combineReducers({ reqApiReducer, perguntasReducer });

export default rootReducers;

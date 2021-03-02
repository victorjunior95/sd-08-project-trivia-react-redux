import { combineReducers } from 'redux';
import loginReducer from './login';

const rootReducers = combineReducers({ loginReducer });

export default rootReducers;

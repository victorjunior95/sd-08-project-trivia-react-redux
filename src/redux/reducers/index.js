import { combineReducers } from 'redux';
import user from './user';
import quiz from './quiz';

const rootReducers = combineReducers({ user, quiz });

export default rootReducers;

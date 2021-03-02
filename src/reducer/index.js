import { combineReducers } from 'redux';
import user from './user';
import image from './image';

const rootReducers = combineReducers({ user, image });

export default rootReducers;

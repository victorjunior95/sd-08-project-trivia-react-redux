import { combineReducers } from 'redux';
import userReducer from './user';
import gameReducer from './game';

const reducer = combineReducers({ user: userReducer, game: gameReducer });

export default reducer;

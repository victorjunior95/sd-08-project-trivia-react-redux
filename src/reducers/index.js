import { combineReducers } from 'redux';

export const LOGIN = 'LOGIN';

const INITIAL_STATE = { email: '', name: '' };

export default function userLogin(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.payload.email, name: action.payload.name };
  default:
    return state;
  }
}

export const reducer = combineReducers({ userLogin });

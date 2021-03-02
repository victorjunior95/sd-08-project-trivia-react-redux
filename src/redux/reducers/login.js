import { LOGIN } from '../actions';

const INITIAL_STATE = {};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.payload.email, name: action.payload.name };
  default:
    return state;
  }
};

export default login;

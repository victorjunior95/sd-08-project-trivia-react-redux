import { API_TOKEN_FAIL, API_TOKEN_REQUEST, API_TOKEN_SUCCESS, LOGIN } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
  },
  email: '',
  requesting: false,
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state,
      email: action.payload.email,
      player: { ...state, name: action.payload.name } };
  default:
    return state;
  }
};

export default login;

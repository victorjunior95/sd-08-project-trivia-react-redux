import { API_TOKEN_FAIL, API_TOKEN_REQUEST, API_TOKEN_SUCCESS, LOGIN } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
  },
  email: '',
  token: '',
  requesting: false,
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state,
      email: action.payload.email,
      player: { ...state, name: action.payload.name } };
  case API_TOKEN_REQUEST:
    return { ...state, requesting: action.payload.requesting };
  case API_TOKEN_SUCCESS:
    return { ...state,
      requesting: action.payload.requesting,
      token: action.payload.token };
  case API_TOKEN_FAIL:
    return { ...state,
      error: action.payload.error,
      requesting: action.payload.requesting };
  default:
    return state;
  }
};

export default login;

import { LOGIN } from '../actions';

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
      player: { name: action.payload.name } };
  default:
    return state;
  }
};

export default login;

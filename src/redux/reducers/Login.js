import { LOGIN } from '../actions';

const INITIAL_STATE = {
  player: {},
  token: '',
  shouldRedirect: false,
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    localStorage.setItem('state', JSON.stringify(action.payload.player));
    localStorage.setItem('token', action.payload.token);
    return {
      player: action.payload.player,
      token: action.payload.token,
      shouldRedirect: true,
    };
  default:
    return state;
  }
}

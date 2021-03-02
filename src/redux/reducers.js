import { LOGIN } from './actions';

export function loginReducer(state = {}, { type, payload }) {
  switch (type) {
  case LOGIN:
    return { ...state, ...payload };
  default:
    return state;
  }
}

export function gameReducer(state = {}, action) {
  switch (action.type) {
  case 'GAME': {
    return state;
  }
  default:
    return state;
  }
}

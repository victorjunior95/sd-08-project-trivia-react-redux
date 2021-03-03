import { PLAYER } from '../actions';

const INITIAL_STATE = '';

function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case PLAYER:
    return { ...state,
      name: payload.name,
      assertions: payload.assertions,
      score: payload.score,
      gravatarEmail: payload.gravatarEmail,
    };
  default:
    return state;
  }
}

export default user;

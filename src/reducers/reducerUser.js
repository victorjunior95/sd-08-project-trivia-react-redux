import { ADD_LOGIN, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  score: 0,
  name: '',
  email: '',
};

const reducerUser = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_LOGIN:
    return ({ ...state, name: payload.name, email: payload.email });
  case UPDATE_SCORE:
    return ({ ...state, score: payload.score });
  default:
    return state;
  }
};

export default reducerUser;

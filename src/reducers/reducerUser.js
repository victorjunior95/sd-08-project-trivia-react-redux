import { ADD_LOGIN } from '../actions';

const INITIAL_STATE = {};

const reducerUser = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_LOGIN:
    return ({ ...state, name: payload.name, email: payload.email });
  default:
    return state;
  }
};

export default reducerUser;

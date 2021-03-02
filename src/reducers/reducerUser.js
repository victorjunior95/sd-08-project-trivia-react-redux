import { ADD_LOGIN } from '../actions';

const INITIAL_STATE = {};

const reducerUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN:
    return ({ ...state, ...action.payload });
  default:
    return state;
  }
};

export default reducerUser;

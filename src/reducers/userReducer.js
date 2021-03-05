import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return ({
      ...state,
      name: action.payload,
      email: action.payload,
    });
  default:
    return state;
  }
};

export default userReducer;

import { SAVE_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_LOGIN:
    return {
      ...state,
      name: action.payload.userName,
      email: action.payload.userEmail,
    };
  default:
    return state;
  }
}

export default login;

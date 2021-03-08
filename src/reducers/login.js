import { SAVE_LOGIN, REDIRECT_PAGE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  redirect: false,
};

function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_LOGIN:
    return {
      ...state,
      name: action.payload.userName,
      email: action.payload.userEmail,
    };
  case REDIRECT_PAGE:
    return {
      ...state,
      redirect: true,
    };
  default:
    return state;
  }
}

export default login;

// import { LOGIN } from '../actions/login';

const INITIAL_STATE = {
  userr: {
    name: '',
    email: '',
  } };

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, userr: action.user };
  default:
    return state;
  }
};

export default user;

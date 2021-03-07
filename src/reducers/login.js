// import { LOGIN } from '../actions/login';

const INITIAL_STATE = {
  countCorrect: 0,
  userr: {
    name: '',
    email: '',
  } };

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, userr: action.user };
  case 'FEEDBACK':
    return { ...state, countCorrect: action.feed };
  default:
    return state;
  }
};

export default user;

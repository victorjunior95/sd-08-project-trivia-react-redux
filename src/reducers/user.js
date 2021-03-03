import { GET_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

const user = (state = INITIAL_STATE, action) => {
  const { type, name, email } = action;
  switch (type) {
  case GET_USER:
    return {
      ...state,
      name,
      email,
    };
  default:
    return state;
  }
};

export default user;

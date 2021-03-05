import { LOGIN, LOGOUT } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  urlPicture: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return action.payload;
  case LOGOUT:
    return { ...INITIAL_STATE };
  default:
    return state;
  }
};

export default userReducer;

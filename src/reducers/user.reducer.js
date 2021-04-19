import { USER_LOGIN } from '../common/ActionTypes';

const initialState = {
  name: '',
  email: '',
};

export default function user(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  case USER_LOGIN:
    return {
      ...state,
      state: payload,
    };

  default:
    return state;
  }
}

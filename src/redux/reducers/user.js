import { SAVE_MAIL } from '../actions/userAction';

const initialState = {
  email: '',
  name: '',
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
  case SAVE_MAIL:
    return { ...state, email: action.email, name: action.name };
  default:
    return state;
  }
}

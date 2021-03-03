import { SAVE_MAIL } from '../actions/userAction';

const initialState = {
  email: '',
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
  case SAVE_MAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
}

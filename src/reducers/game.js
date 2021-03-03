import { LOGIN } from '../actions';

const initialState = {
  email: '',
  name: '',
  score: 0,
};
export default function game(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.value.email,
      name: action.value.name,
    };

  default:
    return state;
  }
}

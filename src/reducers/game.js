import { LOGIN, FETCHQUESTIONS } from '../actions';

const initialState = {
  email: '',
  name: '',
  score: 0,
  questions: {},
};
export default function game(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.value.email,
      name: action.value.name,
    };
  case FETCHQUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
}

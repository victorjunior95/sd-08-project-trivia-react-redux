import { LOGIN, FETCHQUESTIONS } from '../actions';

const initialState = {
  email: '',
  name: '',
  score: 0,
  questions: [],
  loading: true,
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
      loading: false,
    };
  default:
    return state;
  }
}

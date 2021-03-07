import { SAVE_MAIL, ADD_SCORE } from '../actions/userAction';

const initialState = {
  email: '',
  name: '',
  score: 0,
  assertions: 0,
};

export default function loginReducer(state = initialState, action) {
  // const { score, assertions } = state;
  switch (action.type) {
  case SAVE_MAIL:
    return {
      ...state,
      email: action.email,
      name: action.name,
      // score: action.score,
      // assertions: action.assertions,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score,
      assertions: state.assertions,
    };
  default:
    return state;
  }
}

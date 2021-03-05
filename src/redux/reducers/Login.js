import { FIRST_LOGIN } from '../actions';

const INITIAL_STATE = {
  player: {},
  questions: [],
  shouldRedirect: false,
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FIRST_LOGIN:
    return {
      ...state,
      player: action.state,
      questions: action.questions.results,
      shouldRedirect: true,
    };
  default:
    return state;
  }
}

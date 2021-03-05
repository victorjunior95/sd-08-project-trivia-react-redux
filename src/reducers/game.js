import { REQUEST_QUESTIONS, RECEIVE_QUESTIONS } from '../actions';

const INITIAL_STATE = { questions: [], isFetching: true };

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
      isFetching: true,
    };
  case RECEIVE_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default game;

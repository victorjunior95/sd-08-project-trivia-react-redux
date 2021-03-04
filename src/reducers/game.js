import {
  COUNTDOWN,
  REQUEST_TRIVIA_QUESTIONS,
  REQUEST_TRIVIA_QUESTIONS_SUCCESS,
  REQUEST_TRIVIA_QUESTIONS_ERROR,
  FINISH_QUESTION,
} from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  timer: 30,
  endQuestion: false,
};

const gameReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_TRIVIA_QUESTIONS:
    return { ...state, isFetching: payload.isFetching };
  case REQUEST_TRIVIA_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: payload.questions,
      isFetching: payload.isFetching,
    };
  case REQUEST_TRIVIA_QUESTIONS_ERROR:
    return { ...state, error: payload.error, isFetching: payload.isFetching };
  case COUNTDOWN:
    return { ...state, timer: state.timer - 1 };
  case FINISH_QUESTION:
    return { ...state, timer: null, endQuestion: true };
  default:
    return state;
  }
};

export default gameReducer;

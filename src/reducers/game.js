import {
  COUNTDOWN,
  STOP_CLOCK,
  REQUEST_TRIVIA_QUESTIONS,
  REQUEST_TRIVIA_QUESTIONS_SUCCESS,
  REQUEST_TRIVIA_QUESTIONS_ERROR,
  FINISH_QUESTION,
} from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  clock: { seconds: 30, paused: false },
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
  case FINISH_QUESTION:
    return { ...state, endQuestion: true };
  case COUNTDOWN:
    return { ...state, clock: { ...state.clock, seconds: state.clock.seconds - 1 } };
  case STOP_CLOCK:
    return { ...state, clock: { ...state.clock, paused: payload.paused, seconds: payload.seconds } };
  default:
    return state;
  }
};

export default gameReducer;

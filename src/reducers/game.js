import {
  REQUEST_TRIVIA_QUESTIONS,
  REQUEST_TRIVIA_QUESTIONS_SUCCESS,
  REQUEST_TRIVIA_QUESTIONS_ERROR,
} from '../actions';

const INITIAL_STATE = {
  isFetching: true,
};

const gameReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_TRIVIA_QUESTIONS:
    return { ...state, isFetching: payload.isFetching };
  case REQUEST_TRIVIA_QUESTIONS_SUCCESS:
    return { ...state, questions: payload.questions, isFetching: payload.isFetching,
    };
  case REQUEST_TRIVIA_QUESTIONS_ERROR:
    return { ...state, error: payload.error, isFetching: payload.isFetching,
    };
  default:
    return state;
  }
};

export default gameReducer;

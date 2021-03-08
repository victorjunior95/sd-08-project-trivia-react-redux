import {
  QUESTIONS_REQUEST,
  QUESTIONS_SUCCESS,
  QUESTIONS_ERROR,
} from '../actions';

const INITIAL_STATE = {
  token: '',
  questions: [],
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS_REQUEST:
    return {
      ...state,
    };

  case QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.payload,
    };

  case QUESTIONS_ERROR:
    return {
      ...state,
      error: action.payload,
    };

  default:
    return state;
  }
};

export default triviaReducer;

import {
  QUESTIONS_REQUEST,
  QUESTIONS_SUCCESS,
  QUESTIONS_ERROR,
  INCREASE_SCORE,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  success: false,
  score: 0,
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
      questions: action.questions,
      success: true,
    };

  case QUESTIONS_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  case INCREASE_SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
};

export default triviaReducer;

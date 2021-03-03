import {
  REQUEST_START,
  REQUEST_FAIL,
  REQUEST_QUESTION_SUCCESS,
} from '../action';

const INITIAL_STATE = {
  questions: {},
  score: 0,
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_SCORE':
    return { ...state, score: state.score + action.payload.score };
  case REQUEST_START:
    return { ...state, isFetching: true };
  case REQUEST_FAIL:
    return { ...state, isFetching: false, error: action.error };
  case REQUEST_QUESTION_SUCCESS:
    return { ...state, isFetching: false, questions: action.questions };
  default:
    return state;
  }
};

export default triviaReducer;

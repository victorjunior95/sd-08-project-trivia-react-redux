import {
  ADD_QUESTIONS,
  ADD_SCORE,
  ADD_SHUFFLED_ARRAY,
} from '../action';

const INITIAL_STATE = {
  questions: [],
  score: 0,
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE:
    return { ...state, score: action.score };
  case ADD_QUESTIONS:
    return { ...state, questions: action.questions };
  case ADD_SHUFFLED_ARRAY:
    return { ...state, shuffledArray: action.array };
  default:
    return state;
  }
};

export default triviaReducer;

import { combineReducers } from 'redux';
import {
  CORRECT_ANSWER,
  CURRENT_SCORE,
  REQUEST_API_TRIVIA,
  REQUEST_ERROR,
  RESCUE_TIME,
  NEXT_QUESTION,
} from '../action';

const INITIAL_STATE = {
  questions: [],
  currentQuestion: 0,
  correctAnswer: false,
  currentScore: 0,
  rescueTime: 0,
  difficulty: 'easy',
};

const reducerRequestApiTrivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API_TRIVIA:
    return { ...state, questions: action.payload };
  case REQUEST_ERROR:
    return { ...state, questions: action.payload };
  case CORRECT_ANSWER:
    return { ...state, correctAnswer: true };
  case RESCUE_TIME:
    return { ...state, rescueTime: action.payload };
  case CURRENT_SCORE:
    return { ...state, currentScore: state.currentScore + action.payload };
  case NEXT_QUESTION:
    return { ...state,
      currentQuestion: state.currentQuestion + 1,
      correctAnswer: false,
      rescueTime: 0 };
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  reducerRequestApiTrivia,
});

export default rootReducer;

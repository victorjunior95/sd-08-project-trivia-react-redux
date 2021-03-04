import { INCREASE_SCORE, ADD_QUESTIONS, DECREASE_TIME } from '../actions';

const INITIAL_STATE = {
  score: 0,
  questions: [],
  timer: 30,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INCREASE_SCORE:
    return { ...state, score: state.score + action.payload };
  case ADD_QUESTIONS:
    return { ...state, questions: [...state.questions, ...action.payload] };
  case DECREASE_TIME:
    return { ...state, timer: state.timer - 1 };
  default:
    return state;
  }
};

export default gameReducer;

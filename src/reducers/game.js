import { INCREASE_SCORE, ADD_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  score: 0,
  questions: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INCREASE_SCORE:
    return { ...state, score: state.score + action.payload };
  case ADD_QUESTIONS:
    return { ...state, questions: [...state.questions, ...action.payload] };
  default:
    return state;
  }
};

export default gameReducer;

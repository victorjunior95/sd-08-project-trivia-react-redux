import { INCREASE_SCORE, ADD_QUESTIONS, DECREASE_TIME } from '../actions';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
  questions: [],
  timer: 30,
};

const scoreDifficulty = { easy: 1, medium: 2, hard: 3 };
const TEN = 10;
const scoreToBeAdded = (assert, diff, timer) => assert
  * (TEN + (timer * scoreDifficulty[diff]));

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INCREASE_SCORE:
    return { ...state,
      assertions: state.assertions + action.payload.assert,
      score: state.score
      + scoreToBeAdded(action.payload.assert, action.payload.difficulty, state.timer) };
  case ADD_QUESTIONS:
    return { ...state, questions: [...state.questions, ...action.payload] };
  case DECREASE_TIME:
    return { ...state, timer: state.timer - 1 };
  default:
    return state;
  }
};

export default gameReducer;

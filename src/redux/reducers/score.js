import { ADD_SCOREBOARD, ADD_ASSERTIONS, GET_SCORE, GET_ASSERTIONS } from '../actions';

const INITIAL_STATE = { score: 0, assertions: 0 };

const score = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCOREBOARD:
    return { ...state, score: action.payload.score };
  case GET_SCORE:
    return { ...state, score: action.payload.scoreboard };
  case ADD_ASSERTIONS:
    return { ...state, assertions: action.payload.assertions };
  case GET_ASSERTIONS:
    return { ...state, assertions: action.payload.assertions };
  default:
    return state;
  }
};

export default score;

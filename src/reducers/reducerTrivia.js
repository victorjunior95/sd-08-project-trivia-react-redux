import INITIAL_STATE from './initialState';

import {
  DATES_USER,
  TOKEN_USER,
  SCORE,
  QUESTIONS,
} from '../actions';

export default function reducerTrivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DATES_USER:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case TOKEN_USER:
    return {
      ...state,
      token: action.token,
    };
  case SCORE:
    return {
      ...state,
      score: action.score,
    };
  case QUESTIONS:
    return {
      ...state,
      assertions: action.assertions,
      score: action.score,
      gravatar: action.gravatar,
      questions: action.result,
    };
  default:
    return state;
  }
}

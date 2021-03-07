import { ADD_SCOREBOARD, ADD_ASSERTIONS, GET_SCORE, GET_ASSERTIONS } from './index';

export const actionScore = (score) => ({
  type: ADD_SCOREBOARD, payload: { score },
});

export const actionAssertions = (assertions) => ({
  type: ADD_ASSERTIONS,
  payload: { assertions },
});

export const getScore = (score) => ({ type: GET_SCORE, payload: { score } });
export const getAssertions = (assertions) => ({
  type: GET_ASSERTIONS,
  payload: { assertions },
});

import { ADD_SCORE, ADD_ASSERTIONS } from './index';

export const actionScore = (score) => ({
  type: ADD_SCORE, payload: { score },
});

export const actionAssertions = (assertions) => ({
  type: ADD_ASSERTIONS,
  payload: { assertions },
});

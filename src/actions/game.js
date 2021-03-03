import { INCREASE_SCORE, ADD_QUESTIONS } from './index';

export const increaseScore = (payload) => ({
  type: INCREASE_SCORE,
  payload,
});

const addQuestions = (payload) => ({
  type: ADD_QUESTIONS,
  payload,
});

export const getQuestions = (questionsAmount, token) => async (dispatch) => {
  const url = `https://opentdb.com/api.php?amount=${questionsAmount}&token=${token}`;
  const data = await fetch(url);
  const { results } = await data.json();
  dispatch(addQuestions(results));
};

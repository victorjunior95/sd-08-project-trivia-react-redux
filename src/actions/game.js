import { INCREASE_SCORE, ADD_QUESTIONS, DECREASE_TIME } from './index';

export const increaseScore = (assert, difficulty) => ({
  type: INCREASE_SCORE,
  payload: {
    assert,
    difficulty,
  },
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

export const decreaseTime = () => ({
  type: DECREASE_TIME,
});

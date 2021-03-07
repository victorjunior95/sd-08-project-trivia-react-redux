import { getQuiz as getQuizApi } from '../../services/api';
import { GET_QUIZ, REQUEST_QUIZ } from './index';

export const saveQuizAction = () => ({});

const getQuiz = (quiz) => ({ type: GET_QUIZ, payload: { quiz } });

const requestQuiz = () => ({ type: REQUEST_QUIZ });

export const fetchQuiz = (token) => async (dispatch) => {
  dispatch(requestQuiz());
  const results = await getQuizApi(token);
  return dispatch(getQuiz(results));
};

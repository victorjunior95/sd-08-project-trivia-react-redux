import { getQuiz as getQuizApi } from '../../services/api';

export const actionUser = (name, email) => ({ type: 'USER', payload: { name, email } });
export const actionToken = (token) => ({ type: 'TOKEN', payload: { token } });
export const actionScore = (score) => ({ type: 'SCORE', payload: { score } });

export const saveQuizAction = () => ({});

const getQuiz = (quiz) => ({ type: 'GET_QUIZ', payload: { quiz } });
export const getScore = (score) => ({ type: 'GET_SCORE', payload: { score } });

const requestQuiz = () => ({ type: 'REQUEST_QUIZ' });

export const fetchQuiz = (token) => async (dispatch) => {
  dispatch(requestQuiz());
  const results = await getQuizApi(token);
  return dispatch(getQuiz(results));
};

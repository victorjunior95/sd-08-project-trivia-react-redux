import { getToken, getQuestions } from '../services/questionsAPI';

import {
  DATES_USER,
  TOKEN_USER,
  QUESTIONS,
  SCORE,
} from './index';

export function actionLoadedQuestions(token) {
  return async (dispatch) => {
    const QuestionsData = await getQuestions(token);
    dispatch({ type: QUESTIONS, result: QuestionsData.results });
  };
}

export function actionTokenPlayer() {
  return async (dispatch) => {
    const { token } = await getToken();
    localStorage.setItem('token', token);
    dispatch({ type: TOKEN_USER, token: localStorage.getItem('token') });
    dispatch(actionLoadedQuestions(token));
  };
}

export function actionDatesPlayer(name, email) {
  return {
    type: DATES_USER,
    name,
    email,
  };
}

export function actionScore(sum) {
  return {
    type: SCORE,
    sum,
  };
}

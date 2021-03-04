import getQuestions from '../services/questionsAPI';

import {
  FETCH_QUESTIONS,
  UPLOAD_SCORE,
} from './index';

export function actionUploadScore(scorePlayer) {
  return {
    type: UPLOAD_SCORE,
    scorePlayer,
  };
}

questionsData(questions) {
  return {
    type: FETCH_QUESTIONS,
    questions,
  };
}

export function actionFetchQuestions() {
  return async (dispatch) => {
    const questionsData = await getQuestions();
    console.log(questionsData);
    dispatch(questionsData(questions));
    // dispatch(currenciesArray(CurrenciesData));
  };
}

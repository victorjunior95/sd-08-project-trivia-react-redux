import { getQuestions as getQuestionsFromApi } from '../../helpers/index';

const GET_QUESTIONS = 'GET_QUESTIONS';
const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
const FAILED_QUESTIONS = 'FAILED_QUESTIONS';

export function getQuestions(json) {
  return ({
    type: GET_QUESTIONS,
    payload: json.message,
  });
}

export function requestQuestions() {
  return ({
    type: REQUEST_QUESTIONS,
  });
}

export function failedQuestions(error) {
  return ({
    type: FAILED_QUESTIONS,
    payload: error,
  });
}

export function fetchQuestions() {
  return (async (dispatch) => {
    dispatch(requestQuestions());
    try {
      const questions = await getQuestionsFromApi(numberOfQuestions, token);
      return dispatch(getQuestions(questions));
    } catch (error) {
      return dispatch(failedQuestions(error));
    }
  });
}

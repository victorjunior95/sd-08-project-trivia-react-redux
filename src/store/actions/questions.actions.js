// import { getQuestions as getQuestionsFromApi } from '../../helpers/index';

const GET_QUESTIONS = 'GET_QUESTIONS';
const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
const FAILED_QUESTIONS = 'FAILED_QUESTIONS';

export function getQuestions(questions) {
  return ({
    type: GET_QUESTIONS,
    payload: questions,
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

export function fetchQuestions(numberOfQuestions, token) {
  return async (dispatch) => {
    dispatch(requestQuestions());
    const questions = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`)
      .then((allQuestions) => allQuestions.json())
      .catch((error) => { throw new Error(error); });
    return dispatch(getQuestions(questions.results));
  };
}

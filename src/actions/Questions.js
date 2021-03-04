import * as api from '../services/trivia';

export const questions = (questionsArray) => ({ type: 'GET_QUESTIONS', questionsArray });

export const retrieveQuestions = () => async (dispatch) => {
  const result = await api.getQuestion();
  dispatch(questions(result));
  console.log(result);
};

import getquestions from '../Service/getQuetions';

export const PLAYER = 'PLAYER';
export const QUESTIONS = 'QUESTIONS';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';

export const player = (name, assertions, score, gravatarEmail) => ({
  type: PLAYER,
  payload: {
    name,
    assertions,
    score,
    gravatarEmail,
  },
});

export const questionsTrivia = (questions) => ({
  type: QUESTIONS,
  payload: { questions },
});

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
  payload: {
    isFetching: true,
  },
});

export const fetGetQuestions = (NUMBER_OF_QUESTIONS, userToken) => async (dispatch) => {
  dispatch(requestQuestions());
  const getQuestionsResponse = await getquestions(NUMBER_OF_QUESTIONS, userToken);
  console.log(getQuestionsResponse);
  dispatch(
    questionsTrivia(getQuestionsResponse),

  );
};

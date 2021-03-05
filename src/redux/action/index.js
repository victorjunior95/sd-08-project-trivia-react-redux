import requestAPITrivia from '../../services';

export const REQUEST_API_TRIVIA = 'REQUEST_API_TRIVIA';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';
export const RESCUE_TIME = 'RESCUE_TIME';
export const CURRENT_SCORE = 'CURRENT_SCORE';
export const NEXT_QUESTION = 'NEXT_QUESTION';

export const correctAnswer = () => ({
  type: CORRECT_ANSWER,
});

export const rescueTime = (time) => ({
  type: RESCUE_TIME,
  payload: time,
});

export const currentScore = (score) => ({
  type: CURRENT_SCORE,
  payload: score,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

const requestSuccess = (questions) => ({
  type: REQUEST_API_TRIVIA,
  payload: questions,
});

const requestFail = (error) => ({
  type: REQUEST_ERROR,
  payload: error,
});

export const thunk = (currentMode) => async (dispatch) => {
  try {
    const request = await requestAPITrivia(currentMode);
    dispatch(requestSuccess(request.results));
  } catch (error) {
    dispatch(requestFail(error));
  }
};

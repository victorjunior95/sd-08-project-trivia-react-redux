export const ADD_LOGIN = 'ADD_LOGIN';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const ZERO_POINT_FIVE = 0.5;

export const onSubmit = (data) => ({
  type: ADD_LOGIN,
  payload: data,
});

export const scoreGlobal = (score) => ({
  type: UPDATE_SCORE,
  payload: {
    score,
  },
});

export const tokenRequisition = ({ token }) => ({
  type: REQUEST_TOKEN,
  payload: token,
});

export const fetchToken = () => async (dispatch) => {
  const tokenResponse = await (await fetch('https://opentdb.com/api_token.php?command=request')).json();
  dispatch(tokenRequisition(tokenResponse));
  localStorage.setItem('token', tokenResponse.token);
};

export const questionsRequisition = ({ results }, unordered) => ({
  type: REQUEST_QUESTIONS,
  payload: results,
  unordered,
});

export const fetchQuestions = (token) => async (dispatch) => {
  const questionsResponse = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)).json();
  const { results } = questionsResponse;
  const shuffledArray = results.map((element) => {
    const answer = [element.correct_answer, ...element.incorrect_answers];
    return answer.sort(() => ZERO_POINT_FIVE - Math.random());
  });
  dispatch(questionsRequisition(questionsResponse, shuffledArray));
};

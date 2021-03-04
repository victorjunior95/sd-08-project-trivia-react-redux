export const ADD_LOGIN = 'ADD_LOGIN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';

export const onSubmit = (data) => ({
  type: ADD_LOGIN,
  payload: data,
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

export const questionsRequisition = ({ results }) => ({
  type: REQUEST_QUESTIONS,
  payload: results,
});

export const fetchQuestions = (token) => async (dispatch) => {
  const questionsResponse = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)).json();
  dispatch(questionsRequisition(questionsResponse));
};

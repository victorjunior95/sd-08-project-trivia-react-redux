import { fetchQuestion } from '../actions/index';

const API_URL = 'https://opentdb.com/api_token.php?command=request';

const fetchQuestions = async () => {
  const token = localStorage.getItem('token');
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;

  const response = await fetch(url);
  return response.json();
};

export const getRequest = () => async (dispatch) => {
  await fetchQuestions()
    .then((data) => dispatch((fetchQuestion(data.results))));
};

export const getToken = () => fetch(API_URL)
  .then((response) => response.json())
  .then((data) => localStorage.setItem('token', data.token));

export default getToken;

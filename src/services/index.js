const API_URL = 'https://opentdb.com/api_token.php?command=request';

export const getToken = () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => localStorage.setItem('token', data.token));
};

const token = localStorage.getItem('token');

const API_PERGUNTAS = `https://opentdb.com/api.php?amount=${5}&token=${token}`;

const getQuestions = () => {
  getToken();
  fetch(API_PERGUNTAS)
    .then((response) => response.json())
    .then((json) => console.log(json));
};

export default getQuestions;

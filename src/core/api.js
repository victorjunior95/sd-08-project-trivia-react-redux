import axios from 'axios';

const SUCCESS = 200;

export const retriveApiToken = async () => {
  const response = await axios.get(
    'https://opentdb.com/api_token.php?command=request',
  );
  const { status, data } = response;
  if (status === SUCCESS && data.response_code === 0) {
    const { token } = response.data;
    localStorage.setItem('token', token);
    return true;
  }
  return false;
};

export const loadToken = async () => {
  if (!localStorage.getItem('token')) {
    await retriveApiToken();
  }
  return localStorage.getItem('token');
};

export const getToken = async () => {
  const token = await loadToken();
  const response = await axios.get(
    `https://opentdb.com/api.php?amount=1&token=${token}`,
  );
  const { status } = response;
  if (status !== SUCCESS) {
    await retriveApiToken();
  }
  return localStorage.getItem('token');
};

export const getAPIQuestions = async () => {
  const token = await getToken();
  const data = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const response = await data.json();
  return response.results;
};

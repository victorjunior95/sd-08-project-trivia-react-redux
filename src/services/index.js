const API_URL = 'https://opentdb.com/api_token.php?command=request';

const getToken = () => (
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => localStorage.setItem('token', data.token)));

export default getToken;

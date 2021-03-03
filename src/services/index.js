export const requestToken = async () => {
  const data = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await data.json();
  return response.token;
};

export const requestTriviaQuestions = async (token, amount) => {
  const data = await fetch(`https://opentdb.com/api.php?amount=${amount}&token=${token}`);
  const response = await data.json();
  return response.results;
};

export const getToken = async () => {
  if (!localStorage.getItem('token')) {
    const token = await requestToken();
    localStorage.setItem('token', token);
  }
  return localStorage.getItem('token');
};

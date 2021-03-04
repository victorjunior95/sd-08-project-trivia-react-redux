export const requestTriviaToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  const { token } = data;
  return JSON.stringify(token);
};

export const requestTriviaQuestion = async (token, amount) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&token=${token}`);
  const data = await response.json();
  return data;
};

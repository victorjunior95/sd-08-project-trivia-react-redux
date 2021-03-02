export const requestToken = async () => {
  const data = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await data.json();
  return response;
};

export const requestTriviaQuestions = async (token, amount) => {
  const data = await fetch(`https://opentdb.com/api.php?amount=${amount}&token=${token}`);
  response = await data.json();
  return response;
};

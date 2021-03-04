// const fetch = require('node-fetch');

// const { log } = console;

export async function getToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request').then((data) => data.json());
  return response.token;
}

export async function getQuiz(token) {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`).then((data) => data.json());
  return response.results;
}

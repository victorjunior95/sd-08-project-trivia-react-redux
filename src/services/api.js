// const fetch = require('node-fetch');

export async function getToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request').then((data) => data.json());
  return response.token;
}

const newResults = (results) => results.map((element) => ({
  ...element,
  allAnswer: [...element.incorrect_answers
    .map((answer) => [answer, 'wrong-answer-']),
  [element.correct_answer, 'correct-answer']]
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value),
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  correctAnswer: element.correct_answer,
  incorrectAnswers: [...element.incorrect_answers],
}));

const deleteIncorrectAndCorrectAnswers = (element) => element.filter((ele) => (
  delete ele.correct_answer && delete ele.incorrect_answers
));

export async function getQuiz() {
  const token = await getToken();
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`).then((data) => data.json());
  const { results } = response;
  const newArrayObject = newResults(results);
  return deleteIncorrectAndCorrectAnswers(newArrayObject);
}

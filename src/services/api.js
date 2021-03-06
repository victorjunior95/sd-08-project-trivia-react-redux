// const fetch = require('node-fetch');

export async function getToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request').then((data) => data.json());
  return response.token;
}

const newArray = (results) => results.map((element) => ({
  category: element.category,
  type: element.type,
  difficulty: element.difficulty,
  question: element.question,
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

export async function getQuiz() {
  const token = await getToken();
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`).then((data) => data.json());
  const { results } = response;
  const newArrayObject = newArray(results);
  return newArrayObject;
}

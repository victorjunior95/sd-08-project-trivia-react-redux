const getResponse = (response) => (
  response
    .json()
    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
);

const getQuestions = (token) => (
  fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => getResponse(response))
    .then((questions) => questions.results)
);

export default getQuestions;

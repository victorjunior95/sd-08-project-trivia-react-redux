const getResponse = (response) => (
  response
    .json()
    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
);

const getTrivaToken = () => (
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => getResponse(response))
);

const getQuestions = () => (
  fetch(`https://opentdb.com/api.php?amount=5&token=${getTrivaToken()}`)
    .then((response) => getResponse(response))
);

export default getQuestions;

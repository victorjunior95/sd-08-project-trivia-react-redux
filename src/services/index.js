const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const getToken = () => {
  const url = `${URL_TOKEN}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.token);
};

export const getAnswers = (path) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${path}`;
  return fetch(url).then((response) => response.json());
};

export const getCategory = async () => {
  const url = 'https://opentdb.com/api_category.php';
  const response = await fetch(url);
  const dataCategory = await response.json();
  return dataCategory;
};

export const getCountTriviaGlobal = async () => {
  const url = 'https://opentdb.com/api_count_global.php';
  const response = await fetch(url);
  const dataGlobal = await response.json();
  return dataGlobal;
};

export const getAnswersCustom = async (numberQuest, idCategory, difficulty) => {
  const url = `https://opentdb.com/api.php?amount=${numberQuest}&category=${idCategory}&difficulty=${difficulty}`;
  const response = await fetch(url);
  const questionJson = await response.json();
  return questionJson;
};

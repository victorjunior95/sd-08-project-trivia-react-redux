function configToString(configObj) {
  const { category, difficulty, type } = configObj;

  let categoryString = '';
  if (category !== '') categoryString = `&category=${category}`;

  let difficultyString = '';
  if (difficulty !== '') difficultyString = `&difficulty=${difficulty}`;

  let typeString = '';
  if (type !== '') typeString = `&type=${type}`;

  return `${categoryString}${difficultyString}${typeString}`;
}

export default async function fetchQuestionsAPI(configObj, token) {
  const customQuery = configToString(configObj);
  const tokenString = `&token=${token}`;
  const fetchUrl = `https://opentdb.com/api.php?amount=10${tokenString}${customQuery}`;
  const questionsJson = await fetch(fetchUrl);
  const questions = await questionsJson.json();
  return questions;
}

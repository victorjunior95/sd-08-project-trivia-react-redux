import axios from 'axios';

const SUCCESS = 200;
const DEF_QUESTION_AMOUNT = 5;

export const retriveApiToken = async () => {
  const response = await axios.get(
    'https://opentdb.com/api_token.php?command=request',
  );
  const { status, data } = response;
  if (status === SUCCESS && data.response_code === 0) {
    const { token } = response.data;
    localStorage.setItem('token', token);
    return true;
  }
  return false;
};

const loadToken = async () => {
  if (!localStorage.getItem('token')) {
    await retriveApiToken();
  }
  return localStorage.getItem('token');
};

const getToken = async () => {
  const token = await loadToken();
  const response = await axios.get(
    `https://opentdb.com/api.php?amount=1&token=${token}`,
  );
  const { status } = response;
  if (status !== SUCCESS) {
    await retriveApiToken();
  }
  return localStorage.getItem('token');
};

const parseQuestion = async (id, question) => ({
  id,
  category: question.category,
  type: question.type,
  text: question.question,
  answers: [{
    id: 0,
    text: question.correct_answer,
    isCorrect: true,
  },
  ...question.incorrect_answers.map((i, index) => ({
    id: index + 1,
    text: i,
    isCorrect: false,
  })),
  ],
});

export const getQuestions = async (amount = DEF_QUESTION_AMOUNT) => {
  const token = await getToken();
  const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&token=${token}`);
  const { data } = response;
  return Promise.all(
    data.results.map((question, index) => parseQuestion(index, question)),
  );
};

export const shuffle = (list) => {
  const array = [...list];
  let currentIndex = array.length; let temporaryValue; let
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const axios = require('axios');

const SUCCESS = 200;
const DEF_QUESTION_AMOUNT = 5;

const retriveApiToken = async () => {
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

const parseQuestion = async (question) => ({
  category: question.category,
  type: question.type,
  question: question.question,
  answers: [{
    answer: question.correct_answer,
    isCorrect: true,
  },
  ...question.incorrect_answers.map((i) => ({
    answers: i,
    isCorrect: false,
  })),
  ],
});

const getQuestions = async (amount = DEF_QUESTION_AMOUNT) => {
  const token = await getToken();
  const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&token=${token}`);
  const { data } = response;
  return Promise.all(data.results.map((question) => parseQuestion(question)));
};

module.exports = {
  retriveApiToken,
  getQuestions,
};

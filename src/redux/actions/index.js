import md5 from 'crypto-js/md5';

export const LOGIN = 'LOGIN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_TOKEN = 'GET_QUESTIONS_TOKEN';

const getQuestionsAndToken = (questions, token) => ({
  type: GET_QUESTIONS_TOKEN,
  payload: {
    questions,
    token,
  },
});

export const login = (player, token) => ({
  type: LOGIN,
  payload: {
    player,
    token,
  },
});

export const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  payload: {
    questions,
  },
});

// export const game = ()

export const requestNewToken = async () => {
  const newToken = await fetch(
    'https://opentdb.com/api_token.php?command=request',
  )
    .then((response) => response.json())
    .then((data) => data.token);
  const questions = await fetch(
    `https://opentdb.com/api.php?amount=5&token=${newToken}`,
  )
    .then((response) => response.json())
    .then((data) => data);
  return getQuestionsAndToken(questions.results, newToken);
};

export async function requestQuestions(token) {
  const questions = await fetch(
    `https://opentdb.com/api.php?amount=5&token=${token}`,
  )
    .then((response) => response.json())
    .then((data) => data);
  return questions.response_code === 0
    ? getQuestions(questions.results)
    : requestNewToken();
}

export function requestToken(name, email, score) {
  const gravatarEmail = md5(email).toString();
  const player = { name, gravatarEmail, score };
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      const questions = await requestQuestions(token);
      dispatch(questions);
    }
    await fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => dispatch(login(player, data.token)));
  };
}

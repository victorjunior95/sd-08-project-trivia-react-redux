import md5 from 'crypto-js/md5';

export const FIRST_LOGIN = 'FIRST_LOGIN';

// const getQuestionsAndToken = (questions, token) => ({
//   type: GET_QUESTIONS_TOKEN,
//   payload: {
//     questions,
//     token,
//   },
// });

// export const login = (player, token) => ({
//   type: LOGIN,
//   payload: {
//     player,
//     token,
//   },
// });

// export const getQuestions = (questions) => ({
//   type: GET_QUESTIONS,
//   payload: {
//     questions,
//   },
// });

// export const game = ()

// export const requestNewToken = async () => {
//   const newToken = await fetch(
//     'https://opentdb.com/api_token.php?command=request',
//   )
//     .then((response) => response.json())
//     .then((data) => data.token);
//   const questions = await fetch(
//     `https://opentdb.com/api.php?amount=5&token=${newToken}`,
//   )
//     .then((response) => response.json())
//     .then((data) => data);
//   return getQuestionsAndToken(questions.results, newToken);
// };

// export async function requestQuestions(token) {
//   const questions = await fetch(
//     `https://opentdb.com/api.php?amount=5&token=${token}`,
//   )
//     .then((response) => response.json())
//     .then((data) => data);
//   return questions.response_code === 0
//     ? getQuestions(questions.results)
//     : requestNewToken();
// }

// export function requestToken(name, email, score) {
//   const gravatarEmail = md5(email).toString();
//   const player = { name, gravatarEmail, score };
//   return async (dispatch) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const questions = await requestQuestions(token);
//       return dispatch(questions);
//     }
//     await fetch('https://opentdb.com/api_token.php?command=request')
//       .then((response) => response.json())
//       .then((data) => dispatch(login(player, data.token)));
//   };
// }

export const actionFirstLogin = (state, questions) => ({
  type: FIRST_LOGIN,
  state,
  questions,
});

function requestTokenId() {
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => data.token);
}

function requestQuestions(token) {
  const path = `https://opentdb.com/api.php?amount=5&token=${token}`;
  return fetch(path)
    .then((response) => response.json())
    .then((data) => data);
}

export function requestToken(name, email, score) {
  const errorCode = 3;
  if (localStorage.token === undefined) {
    return async (dispatch) => {
      const token = await requestTokenId();
      const questions = await requestQuestions(token);
      const gravatarEmail = md5(email).toString();
      const state = {
        name,
        gravatarEmail,
        score,
      };
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('state', JSON.stringify(state));
      dispatch(actionFirstLogin(state, questions));
    };
  }
  return async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const questions = await requestQuestions(token);
    if (questions.response_code === errorCode) {
      const newToken = await requestTokenId();
      const questionsNewToken = await requestQuestions(newToken);
      const gravatarEmail = md5(email).toString();
      const state = {
        name,
        gravatarEmail,
        score,
      };
      localStorage.setItem('token', JSON.stringify(newToken));
      localStorage.setItem('state', JSON.stringify(state));
      dispatch(actionFirstLogin(state, questionsNewToken));
    } else {
      const questionsNoErrorCode = await requestQuestions(token);
      const gravatarEmail = md5(email).toString();
      const state = {
        name,
        gravatarEmail,
        score,
      };
      localStorage.setItem('state', JSON.stringify(state));
      dispatch(actionFirstLogin(state, questionsNoErrorCode));
    }
  };
}

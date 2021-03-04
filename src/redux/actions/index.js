import md5 from 'crypto-js/md5';

export const FIRST_LOGIN = 'FIRST_LOGIN';
export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';

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

export const toggleSelected = () => ({
  type: TOGGLE_SELECTED,
});

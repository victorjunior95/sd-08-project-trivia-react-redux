export const REQUEST_API = 'REQUEST_API';
export const GET_API = 'GET_API';
export const FAILED_API = 'FAILED_API';
export const GET_TOKEN = 'GET_TOKEN';
export const LOGIN = 'LOGIN';
export const TOGGLE_ANSWER_TRUE = 'TOGGLE_ANSWER_TRUE';
export const TOGGLE_ANSWER_FALSE = 'TOGGLE_ANSWER_FALSE';

export const loginAction = (name, email) => ({
  type: LOGIN,
  payload: {
    name,
    email,
  },
});

export const answerTrue = () => ({
  type: TOGGLE_ANSWER_TRUE,
});

export const answerFalse = () => ({
  type: TOGGLE_ANSWER_FALSE,
});

function getAPI(json) {
  return { type: GET_API, payload: json };
}

function getToken(json) {
  return { type: GET_TOKEN, payload: json };
}

function requestAPI() {
  return { type: REQUEST_API };
}

function failedAPI(error) {
  return { type: FAILED_API, payload: error };
}

export function fetchToken() {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());

      const tokenResponse = await fetch('https://opentdb.com/api_token.php?command=request');
      const tokenJson = await tokenResponse.json();

      dispatch(getToken(tokenJson));
      localStorage.setItem('token', tokenJson.token);

      const triviaResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenJson.token}`);
      const triviaJson = await triviaResponse.json();

      return dispatch(getAPI(triviaJson));
    } catch (error) {
      dispatch(failedAPI(error));
    }
  };
}

export function fetchAPI(token) {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const triviaResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const triviaJson = await triviaResponse.json();

      return dispatch(getAPI(triviaJson));
    } catch (error) {
      dispatch(failedAPI(error));
    }
  };
}

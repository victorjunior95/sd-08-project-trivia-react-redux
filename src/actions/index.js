const REQUEST_API = 'REQUEST_API';
const GET_API = 'GET_API';
const FAILED_API = 'FAILED_API';
const GET_TOKEN = 'GET_TOKEN';

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

      const triviaResponse = await fetch('https://opentdb.com/api_token.php?command=request');
      const triviaJson = await triviaResponse.json();

      return dispatch(getToken(triviaJson));
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

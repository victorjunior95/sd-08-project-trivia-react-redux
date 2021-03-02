export const LOGIN = 'LOGIN';
export const GET_TOKEN = 'GET_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const SAVE = 'SAVE';

export const saveLoginInfo = ({ email, playerName }) => ({
  type: LOGIN,
  payload: { email, playerName },
});

function getToken(json) {
  return {
    type: GET_TOKEN,
    payload: json.token,
  };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

export function saveConfig(obj) {
  return { type: SAVE, payload: obj };
}

export function fetchToken() {
  return (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
    .then((r) => r.json()
      .then(
        (json) => dispatch(getToken(json)),
        (error) => dispatch(failedRequest(error)),
      ));
}

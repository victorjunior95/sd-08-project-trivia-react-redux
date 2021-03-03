export const GET_TOKEN = 'GET_TOKEN';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';

const requestToken = () => ({
  type: GET_TOKEN,
});

const receiveToken = (json) => ({
  type: RECEIVE_TOKEN,
  payload: json,
});

export function fetchToken() {
  return (dispatch) => {
    dispatch(requestToken());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((token) => dispatch(receiveToken(token)));
  };
}

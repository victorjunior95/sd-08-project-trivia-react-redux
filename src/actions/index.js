export const SAVED_USER = 'SAVED_USER';
export const SAVED_INPUT = 'SAVED_INPUT';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const GET_TOKEN = 'GET_TOKEN';
export const FAILED_TOKEN = 'FAILED_TOKEN';

// export const savedUser = (user) => ({
//   type: SAVED_USER,
//   user,
// });

// export const savedInput = (inputData) => ({
//   type: SAVED_INPUT,
//   expenses: inputData,
// });

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const receiveToken = (token) => console.log(token) || ({
  type: GET_TOKEN,
  token,
});

export const failedToken = (error) => ({
  type: FAILED_TOKEN,
  payload: {
    error,
  },
});

export const fetchToken = () => (dispatch) => {
  dispatch(requestToken());
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((data) => data.json())
    .then(
      (json) => dispatch(receiveToken(json)),
    )
    .catch((error) => dispatch(failedToken(error)));
};

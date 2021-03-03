export const REQUEST_TOKEN = 'REQUEST_TOKEN';

const requestSuccess = (token) => ({
  type: REQUEST_TOKEN,
  payload: {
    token,
  },
});

const getFetchAPI = () => (
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const fetchToken = () => async (dispatch) => {
  const token = await getFetchAPI();
  console.log(token);
  dispatch(requestSuccess(token.token));
};

export default fetchToken;

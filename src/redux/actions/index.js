const requestApiSuccess = (api) => ({
  type: 'API_SUCCESS',
  payload: {
    api,
  },
});

const requestApiFail = (error) => ({
  type: 'API_FAIL',
  payload: {
    error,
  },
});

const fetchAPI = () => async (dispatch) => {
  try {
    const tokenRequest = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenReturn = await tokenRequest.json();
    dispatch(requestApiSuccess(tokenReturn));
  } catch (error) {
    dispatch(requestApiFail(error));
  }
};

export default fetchAPI;

export const ADD_LOGIN = 'ADD_LOGIN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const onSubmit = (data) => ({
  type: ADD_LOGIN,
  payload: data,
});

export const tokenRequisition = ({ token }) => ({
  type: REQUEST_TOKEN,
  payload: token,
});

export const fetchToken = () => async (dispatch) => {
  const tokenResponse = await (await fetch('https://opentdb.com/api_token.php?command=request')).json();
  dispatch(tokenRequisition(tokenResponse));
  localStorage.setItem('token', tokenResponse.token);
};

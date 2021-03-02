export const GET_USER = 'GET_USER';
export const GET_TOKEN = 'GET_TOKEN';

export const getUser = (name, email) => ({
  type: GET_USER,
  name,
  email,
});

export const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

async function fetchToken() {
  const returnAPI = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = returnAPI.json();
  // console.log(token);
  // {
  //   "response_code":0,
  //   "response_message":"Token Generated Successfully!",
  //   "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
  // }
  return token;
}

export const getTokenAndSaveToLocalStore = () => async (dispatch) => {
  const token = await fetchToken();
  dispatch(getToken(token.token));
  localStorage.setItem('token', token.token);
};

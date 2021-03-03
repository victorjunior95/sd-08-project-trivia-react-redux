import { TOKEN_REQUEST, TOKEN_REQUEST_SUCCESS, UPDATE_SCORE, urlToken } from '../consts';

export const login = (value) => ({ type: 'LOGIN', payload: value });
export const logout = (value) => ({ type: 'LOGOUT', payload: value });

const apiFetchTokenRequest = () => ({
  type: TOKEN_REQUEST,
});

const apiFetchTokenSuccess = (token) => ({
  type: TOKEN_REQUEST_SUCCESS,
  payload: token,
});

export const fetchApiToken = () => (dispatch) => {
  dispatch(apiFetchTokenRequest());
  return fetch(urlToken)
    .then((response) => response.json())
    .then((data) => {
      dispatch(apiFetchTokenSuccess(data.token));
      localStorage.token = data.token;
    })
    .catch((error) => console.log(error));
};

export const updateScore = (score) => ({ type: UPDATE_SCORE, payload: score });

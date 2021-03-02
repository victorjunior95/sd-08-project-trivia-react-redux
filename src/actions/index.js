import { TOKEN_REQUEST, TOKEN_REQUEST_SUCCESS, urlToken } from '../consts';

export const login = (value) => ({ type: 'LOGIN', value });
export const logout = (value) => ({ type: 'LOGOUT', value });

const apiFetchTokenRequest = () => ({
  type: TOKEN_REQUEST,
});

const apiFetchTokenSuccess = (payload) => ({
  type: TOKEN_REQUEST_SUCCESS,
  payload,
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
}
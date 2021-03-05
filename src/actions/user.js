import md5 from 'crypto-js/md5';
import { LOGIN, LOGOUT } from './index';

const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const loginAuth = (payload) => (async (dispatch) => {
  const urlPicture = `https://www.gravatar.com/avatar/${md5(payload.email)}`;
  const data = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await data.json();
  dispatch(login({ ...payload, token, urlPicture }));
});

export const logout = () => ({
  type: LOGOUT,
});

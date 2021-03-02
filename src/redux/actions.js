export const LOGIN = 'LOGIN';

export const saveLoginInfo = ({ email, playerName }) => ({
  type: LOGIN,
  payload: { email, playerName },
});

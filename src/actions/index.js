export const GET_LOGIN = 'GET_LOGIN';

export const setLogin = (email, name) => ({
  type: GET_LOGIN,
  email,
  name,
});

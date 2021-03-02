export const LOGIN = 'LOGIN';
export const INPUT_VALUE = 'INPUT_VALUE'

export const saveInputs = (payload) => ({
  type: INPUT_VALUE,
  payload,
});

export const loginAction = (payload) => ({
  type: LOGIN,
  payload,
});

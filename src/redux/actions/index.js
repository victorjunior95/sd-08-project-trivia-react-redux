// Action

export const LOGIN = 'LOGIN';
export const INPUT = 'INPUT';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const handleInput = (position, input) => ({
  type: INPUT,
  [position]: input,
});

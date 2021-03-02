export const ADD_LOGIN = 'ADD_LOGIN';

export const onSubmit = (data) => ({
  type: ADD_LOGIN,
  payload: {
    data,
  },
});

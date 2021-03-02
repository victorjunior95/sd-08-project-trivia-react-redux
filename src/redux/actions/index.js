const LOGIN = 'LOGIN';

const loginAction = ({ email, name }) => ({
  type: LOGIN,
  payload: {
    email,
    name,
  },
});

export {
  LOGIN,
  loginAction,
};

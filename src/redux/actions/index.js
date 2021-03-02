const LOGIN = 'LOGIN';

const loginAction = ({ email, nome }) => ({
  type: LOGIN,
  payload: {
    email,
    nome,
  },
});

export {
  LOGIN,
  loginAction,
};

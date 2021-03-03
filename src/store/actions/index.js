import LOGIN from '../consts';

const loginAction = (email, username) => ({
  type: LOGIN,
  payload: {
    email,
    username,
  },
});
export default loginAction;

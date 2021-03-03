import md5 from 'crypto-js/md5';

export const LOGIN = 'LOGIN';

export const login = (player, token) => ({
  type: LOGIN,
  payload: {
    player,
    token,
  },
});

export function requestToken(name, email) {
  const gravatarEmail = md5(email).toString();
  const player = { name, gravatarEmail };
  return async (dispatch) => {
    await fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => dispatch(login(player, data.token)));
  };
}

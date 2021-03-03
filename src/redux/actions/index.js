import api, { https } from '../../services/apiGamer';
import localStorageTokken from '../../services/validatorLocalStorage';

export const INITIALIZE_GAME = 'INICIALIZE_GAME';

const startTheGame = (payload) => ({
  type: INITIALIZE_GAME,
  payload,
});

export function getStartTheGame({ nickname, email }) {
  return async (dispatch) => {
    const { token } = await api(https.token);
    localStorageToken('token', token)
      .then((response) => dispatch(startTheGame({
        email,
        nickname,
        ...response,
      })));
  };
}

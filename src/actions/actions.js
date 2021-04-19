import USER_LOGIN from '../common/ActionTypes';

// eslint-disable-next-line import/prefer-default-export
export function login(payload) {
  return {
    type: USER_LOGIN,
    payload,
  };
}

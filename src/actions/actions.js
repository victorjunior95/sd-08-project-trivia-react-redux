import * as ActionTypes from '../common/ActionTypes';

export function login(payload) {
  const { token, access } = payload;
  return {
    type: ActionTypes.APP_AUTH_LOGIN,
    payload: {
      token,
      access,
    },
  };
}

export function logout() {
  return {
    type: ActionTypes.APP_AUTH_LOGOUT,
  };
}

export function userGeo(payload) {
  return {
    type: ActionTypes.APP_AUTH_LOGIN,
    payload,
  };
}

export function unset(key) {
  if (!key) return null;
  return {
    type: ActionTypes.SETTINGS_UNSET,
    payload: key,
  };
}

export function reset() {
  return {
    type: ActionTypes.SETTINGS_RESET,
  };
}

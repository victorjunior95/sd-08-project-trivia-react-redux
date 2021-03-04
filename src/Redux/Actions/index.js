import types from './types';

export const sendLoginInfo = (payload) => (
  {
    type: types.LOGIN_INFO,
    payload,
  }
);

export const saveUserInfos = (userInfos) => ({
  type: types.SAVE_USER_INFOS,
  userInfos,
});

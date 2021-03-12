import types from '../Actions/types';

const initialState = {
  name: '',
  email: '',
  avatar: '',
  assertions: 0,
  score: 0,
};

function user(state = initialState, action) {
  switch (action.type) {
  case types.SAVE_USER_INFOS:
    return {
      ...state,
      name: action.userInfos.user.name,
      email: action.userInfos.user.email,
      avatar: action.userInfos.user.avatar,
    };
  case types.NEW_USER_STATE:
    return {
      ...state,
      score: action.newUserState.score,
      assertions: action.newUserState.assertions,
    };
  default:
    return state;
  }
}

export default user;

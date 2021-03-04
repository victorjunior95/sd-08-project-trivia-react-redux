import {
  USER_INFOS,
} from '../Actions';

const initialState = {
  avatar: '',
  name: '',
  score: 0,
};

function user(state = initialState, action) {
  switch (action.type) {
  case USER_INFOS:
    return {
      ...state,
      name: action.user.name,
      avatar: action.user.avatar,
      score: action.user.score,
    };
  default:
    return state;
  }
}

export default user;

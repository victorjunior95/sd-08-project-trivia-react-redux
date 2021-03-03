import { TOKEN_REQUEST, TOKEN_REQUEST_SUCCESS, UPDATE_SCORE } from '../consts';

const INITIAL_STATE = {
  token: '',
  isLoading: false,
  score: 0,
};

const play = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_REQUEST:
    return { ...state, isLoading: true };
  case TOKEN_REQUEST_SUCCESS:
    return { ...state, token: action.payload, isLoading: false };
  case UPDATE_SCORE:
    return { ...state, score: action.payload };
  default:
    return state;
  }
};

export default play;

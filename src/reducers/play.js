import { TOKEN_REQUEST, TOKEN_REQUEST_SUCCESS } from "../consts";

const INITIAL_STATE = {
  token: '',
  isLoading: false,
};

const play = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case TOKEN_REQUEST:
      return { ...state, isLoading: true };
    case TOKEN_REQUEST_SUCCESS:
      return { ...state, token: action.payload, isLoading: false };
    default:
      return state;
  }
};

export default play;

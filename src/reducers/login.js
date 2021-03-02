import { INPUT_VALUE,
  REQUEST_TRIVIA_TOKEN,
  REQUEST_TRIVIA_TOKEN_SUCCESS,
  REQUEST_TRIVIA_TOKEN_ERROR
} from '../actions';

const INITIAL_STATE = {};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INPUT_VALUE:
    return { ...state, ...action.payload };
  case REQUEST_TRIVIA_TOKEN:
    return { ...state, isFetching: action.payload.isFetching };
  case REQUEST_TRIVIA_TOKEN_SUCCESS:
    return { ...state, token: action.payload.token, isFetching: action.payload.isFetching };
  case REQUEST_TRIVIA_TOKEN_ERROR:
    return { ...state, error: action.payload.error, isFetching: action.payload.isFetching };
  default:
    return state;
  }
};

export default loginReducer;

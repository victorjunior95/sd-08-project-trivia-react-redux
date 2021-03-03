import {
  INPUT_VALUE,
  REQUEST_TRIVIA_TOKEN,
  REQUEST_TRIVIA_TOKEN_SUCCESS,
  REQUEST_TRIVIA_TOKEN_ERROR,
  GET_HASH_EMAIL,
} from '../actions';

const INITIAL_STATE = {
  HashEmail: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INPUT_VALUE:
    return { ...state, ...action.payload };
  case GET_HASH_EMAIL:
    return { ...state, HashEmail: action.HashEmail };
  case REQUEST_TRIVIA_TOKEN:
    return { ...state, isFetching: action.payload.isFetching };
  case REQUEST_TRIVIA_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload.token,
      isFetching: action.payload.isFetching,
    };
  case REQUEST_TRIVIA_TOKEN_ERROR:
    return {
      ...state,
      error: action.payload.error,
      isFetching: action.payload.isFetching,
    };
  default:
    return state;
  }
};

export default loginReducer;

const INITIAL_STATE = {
  isFetching: false,
  token: {},
  data: {},
  error: '',
};

export default function requestTokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_API':
    return { ...state, isFetching: true };
  case 'GET_TOKEN':
    return { ...state, token: action.payload, isFetching: false };
  case 'GET_API':
    return { ...state, data: action.payload, isFetching: false };
  case 'FAILED_API':
    return { ...state, error: action.payload, isFetching: false };
  default:
    return state;
  }
}

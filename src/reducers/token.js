import { RECEIVE_TOKEN } from '../actions/fetchToken';

const initialState = {
  token: '',
};

const token = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_TOKEN:
    return ({
      ...state,
      token: action.payload.token,
    });
  default:
    return state;
  }
};

export default token;

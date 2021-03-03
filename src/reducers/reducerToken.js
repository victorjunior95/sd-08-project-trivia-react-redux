import { REQUEST_TOKEN } from '../actions';

const INITIAL_STATE = {

};

const reducerToken = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_TOKEN:
    return ({
      ...state, id: payload });
  default:
    return state;
  }
};
export default reducerToken;

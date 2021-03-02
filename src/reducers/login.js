import { INPUT_VALUE } from '../actions';

const INITIAL_STATE = {};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INPUT_VALUE:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default loginReducer;

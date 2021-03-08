import {
  API_SUCCESS,
  API_FAIL,
  INCREASE_SCORE,
} from '../actions';

const INITIAL_STATE = {
  api: '',
  error: '',
  login: false,
  score: 0,
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_SUCCESS:
    return {
      ...state,
      api: action.payload,
      login: true,
    };
  case API_FAIL:
    return {
      ...state,
      error: action.payload,
    };
  case INCREASE_SCORE:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: action.score,
    };
  default:
    return state;
  }
};

export default login;

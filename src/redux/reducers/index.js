import { combineReducers } from 'redux';
import { REQUEST_API_TRIVIA, REQUEST_ERROR } from '../action';

const INITIAL_STATE = {
  questions: [],
};

const reducerRequestApiTrivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API_TRIVIA:
    return { ...state, questions: action.payload };
  case REQUEST_ERROR:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  reducerRequestApiTrivia,
});

export default rootReducer;

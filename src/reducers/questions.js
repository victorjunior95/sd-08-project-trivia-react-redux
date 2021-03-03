import { RECEIVE_QUESTIONS } from '../actions/fetchQuestions';

const initialState = {
  questions: [],
};

const questions = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_QUESTIONS:
    return ({
      ...state,
      questions: action.payload,
    });
  default:
    return state;
  }
};

export default questions;

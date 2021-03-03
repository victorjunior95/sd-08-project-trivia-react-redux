import { apiRequestQuestionSent, apiRequestQuestionSucess } from '../actions';

const INITIAL_STATE = {
  results: [],
  isLoading: false,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case apiRequestQuestionSent:
    return { ...state, isLoading: true };
  case apiRequestQuestionSucess:
    return { ...state, results: action.value.json, isLoading: false };
  default:
    return state;
  }
};

export default questions;

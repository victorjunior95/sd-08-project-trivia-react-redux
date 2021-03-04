import { REQUEST_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [{
    category: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
  }],
};

const reducerQuestions = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_QUESTIONS:
    return ({
      ...state, questions: payload });
  default:
    return state;
  }
};
export default reducerQuestions;

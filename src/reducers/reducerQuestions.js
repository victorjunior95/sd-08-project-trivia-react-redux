import { REQUEST_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [{
    category: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
  }],
  shufledAnswers: [],
  questionNumber: 0,
};

const reducerQuestions = (state = INITIAL_STATE, { type, payload, unordered }) => {
  switch (type) {
  case REQUEST_QUESTIONS:
    return ({
      ...state, questions: payload, shufledAnswers: unordered });
  default:
    return state;
  }
};
export default reducerQuestions;

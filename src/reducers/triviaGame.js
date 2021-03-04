import { SAVE_QUESTIONS, SAVE_TIME } from '../actions';

const INITIAL_STATE = {
  isLoading: true,
  questions: {
    response_code: null,
    results: [{
      category: '',
      correct_answer: '',
      difficulty: '',
      incorrect_answers: [''],
      question: '',
      type: 'none',
    }],
  },
  timer: 0,
};

export default function triviaGame(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: payload.questions,
    };
  case SAVE_TIME:
    return {
      ...state,
      timer: payload,
    };
  default:
    return state;
  }
}

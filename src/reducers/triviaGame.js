import { SAVE_QUESTIONS } from '../actions';

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
};

export default function triviaGame(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: payload.questions,
    };
  default:
    return state;
  }
}

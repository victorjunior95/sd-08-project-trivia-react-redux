import { ANSWER_CHOSEN, NEXT_QUESTION } from '../actions';

const INITIAL_STATE = {
  shouldShuffle: true,
  correctAnswerClass: 'correct-answer',
  wrongAnswerClass: 'wrong-answer',
  shouldShowClass: false,
  showButtonNextQuestion: false,
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ANSWER_CHOSEN:
    return {
      ...state,
      shouldShuffle: false,
      shouldShowClass: true,
      showButtonNextQuestion: true,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      shouldShuffle: true,
      shouldShowClass: false,
    };
  default:
    return state;
  }
}

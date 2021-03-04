<<<<<<< HEAD
import { QUESTIONS_REQUEST, QUESTIONS_REQUEST_SUCCESS, TOKEN_REQUEST, TOKEN_REQUEST_SUCCESS, UPDATE_SCORE } from '../consts';
=======
import { ADD_CORRECT_ANSWER, TOKEN_REQUEST,
  TOKEN_REQUEST_SUCCESS, UPDATE_SCORE } from '../consts';
>>>>>>> 541e54e8f132b126950b72d9a87e96e07906344a

const INITIAL_STATE = {
  token: '',
  score: 0,
<<<<<<< HEAD
  isLoading: false,
  isLoadingQuestions: true,
  questions: [],
  id: 0,
=======
  correctAnswers: 0,
>>>>>>> 541e54e8f132b126950b72d9a87e96e07906344a
};

const play = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_REQUEST:
    return { ...state, isLoading: true };
  case TOKEN_REQUEST_SUCCESS:
    return { ...state, token: action.payload, isLoading: false };
  case UPDATE_SCORE:
    return { ...state, score: action.payload };
<<<<<<< HEAD
  case QUESTIONS_REQUEST:
    return { ...state, isLoadingQuestions: true };
  case QUESTIONS_REQUEST_SUCCESS:
    return { ...state,
      isLoadingQuestions: false,
      questions: action.payload.questions.results,
    };
=======
  case ADD_CORRECT_ANSWER:
    return { ...state, correctAnswers: state.correctAnswers + 1 };
>>>>>>> 541e54e8f132b126950b72d9a87e96e07906344a
  default:
    return state;
  }
};

export default play;

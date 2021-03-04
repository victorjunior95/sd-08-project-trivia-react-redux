import { API_TRIVIA_FAIL, API_TRIVIA_RESQUEST, API_TRIVIA_SUCCESS } from '../actions';

const INITIAL_STATE = {
  player: {
    assertions: 0,
    score: 0,
  },
  questions: [],
  requesting: false,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_TRIVIA_RESQUEST:
    return { ...state, requesting: action.payload.requesting };
  case API_TRIVIA_SUCCESS:
    return { ...state,
      questions: action.payload.questions,
      requesting: action.payload.requesting };
  case API_TRIVIA_FAIL:
    return { ...state,
      requesting: action.payload.requesting,
      error: action.payload.requesting };
  default:
    return state;
  }
};

export default game;

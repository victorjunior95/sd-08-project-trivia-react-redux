import types from '../Actions/types';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
};

function game(state = initialState, action) {
  switch (action.type) {
  case types.SAVE_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
}

export default game;

export const Types = {
  FETCH_QUESTIONS: 'FETCH_QUESTIONS',
  SAVE_QUESTIONS: 'SAVE_QUESTIONS',
  RIGHT_ANSWER: 'RIGHT_ANSWER',
  WRONG_ANSWER: 'WRONG_ANSWER',
  NEXT_QUESTION: 'NEXT_QUESTION',
};

const INITIAL_STATE = {
  questions: [],
  numberOfQuestions: 5,
  currentQuestionIndex: 0,
  isRevealed: false,
  score: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.SAVE_QUESTIONS: {
    return { ...state, questions: action.payload };
  }

  case Types.RIGHT_ANSWER: {
    return {
      ...state,
      isRevealed: true,
      score: state.score + 1,
    };
  }

  case Types.WRONG_ANSWER: {
    return { ...state, isRevealed: true };
  }

  case Types.NEXT_QUESTION: {
    const newQuestionIndex = state.currentQuestionIndex + 1;
    return {
      ...state,
      currentQuestionIndex: newQuestionIndex < state.questions.length
        ? newQuestionIndex : state.currentQuestionIndex,
      isRevealed: false,
    };
  }

  default:
    return state;
  }
};

export const Creators = {
  saveQuestions: (questions) => ({
    type: Types.SAVE_QUESTIONS,
    payload: questions,
  }),

  fetchQuestions: () => async (dispatch, getState, api) => {
    const INVALID_TOKEN = 3;
    const { game: { numberOfQuestions } } = getState();
    const token = localStorage.getItem('token');
    const data = await api.getQuestions(token, numberOfQuestions);
    if (data.response_results === INVALID_TOKEN) {
      console.log('clear token');
      localStorage.clear('token');
    }
    dispatch(Creators.saveQuestions(data.results));
  },

  rightAnswer: () => ({
    type: Types.RIGHT_ANSWER,
  }),

  wrongAnswer: () => ({
    type: Types.WRONG_ANSWER,
  }),

  nextQuestion: () => ({
    type: Types.NEXT_QUESTION,
  }),
};

export default game;

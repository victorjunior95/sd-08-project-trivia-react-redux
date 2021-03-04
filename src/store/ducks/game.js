export const Types = {
  FETCH_QUESTIONS: 'FETCH_QUESTIONS',
  SAVE_QUESTIONS: 'SAVE_QUESTIONS',
};

const INITIAL_STATE = {
  numberOfQuestions: 5,
  questions: [],
  currentQuestionIndex: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.SAVE_QUESTIONS:
    return { ...state, questions: action.payload };
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
    const { game: { numberOfQuestions } } = getState();
    const token = localStorage.getItem('token');
    const { results } = await api.getQuestions(token, numberOfQuestions);
    dispatch(Creators.saveQuestions(results));
  },
};

export default game;

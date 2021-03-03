export const Types = {
  FETCH_QUESTIONS: 'FETCH_QUESTIONS',
};

export const Creators = {
  fetchQuestions: (dispatch, getStore, api) => () => {
    console.log(dispatch, getStore, api);
  },
};

const game = (state = {}, action) => {
  switch (action.type) {
  case Types.FETCH_QUESTIONS:
    return state;
  default:
    return state;
  }
};

export default game;

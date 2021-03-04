const INITIAL_VALUE = {
  acertos: 0,
};

const perguntasReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
  case 'TOTAL':
    return { ...state, acertos: state.acertos + 1 };
  default:
    return state;
  }
};

export default perguntasReducer;

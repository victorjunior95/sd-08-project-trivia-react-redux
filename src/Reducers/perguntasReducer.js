const INITIAL_VALUE = {
  acertos: 0,
};

const perguntasReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
  case 'TOTAL':
    return { ...state, acertos: action.payload };
  default:
    return state;
  }
};

export default perguntasReducer;

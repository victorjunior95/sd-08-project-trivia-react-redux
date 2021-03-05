const INITIAL_STATE = { score: 0 };

const score = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SCORE': {
    return { ...state, score: action.payload.score };
  }
  case 'GET_SCORE': {
    return { ...state, score: action.payload.score };
  }
  default:
    return state;
  }
};

export default score;

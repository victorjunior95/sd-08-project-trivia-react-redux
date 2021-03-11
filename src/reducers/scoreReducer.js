const InitialState = {
  score: [],
};

const Score = (state = InitialState, action) => {
  switch (action.type) {
  case 'USER_SCORE':
    return {
      ...state,
      score: [...state.score, action.payload.userScore],

    };
  default:
    return state;
  }
};

export default Score;

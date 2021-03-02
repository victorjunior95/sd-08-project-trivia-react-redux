const initialState = {
  score: 0,
};

const score = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD-SCORE':
    return ({
      ...state,
      score: action.payload.value,
    });
  default:
    return state;
  }
};

export default score;

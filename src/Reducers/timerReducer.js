const INITIAL_VALUE = 10;

const timerReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
  case 'REMOVETEMPO':
    return action.payload;
  case 'RESETATEMPO':
    return state;

  default:
    return state;
  }
};

export default timerReducer;

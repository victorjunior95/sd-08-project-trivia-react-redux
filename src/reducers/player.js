import { SAVE_SCORE } from '../services/consts';

const INITIAL_STATE = {
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  console.log(action.type);
  switch (action.type) {
  case SAVE_SCORE:
    return { ...state, score: action.payload };
  default:
    return state;
  }
};

export default player;

import { LOGIN, TOGGLE_ANSWER_TRUE, TOGGLE_ANSWER_FALSE } from '../actions';

const PLAYER_INITIAL_STATE = {
  hasAnswered: false,
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  email: '',
};

const playerReducer = (state = PLAYER_INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.payload.email,
      player: { ...state.player, name: action.payload.name } };
  case TOGGLE_ANSWER_TRUE:
    return {
      ...state,
      hasAnswered: true,
    };
  case TOGGLE_ANSWER_FALSE:
    return {
      ...state,
      hasAnswered: false,
    };
  default:
    return state;
  }
};

export default playerReducer;

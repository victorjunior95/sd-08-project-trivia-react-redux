import { LOGIN } from '../actions';

const PLAYER_INITIAL_STATE = {
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
    console.log('state.player', state.player);
    console.log('action.payload', action.payload);
    return {
      ...state,
      email: action.payload.email,
      player: { ...state.player, name: action.payload.name } };
  default:
    return state;
  }
};

export default playerReducer;

// import { act } from '@testing-library/react';
import { LOGIN } from '../actions';

const PLAYER_INITIAL_STATE = {
  player: '',
  email: '',
};

const playerReducer = (state = PLAYER_INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      player: action.payload.player,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default playerReducer;

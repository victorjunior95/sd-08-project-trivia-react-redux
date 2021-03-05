import { TOGGLE_SELECTED, NEXT_QUESTION, SEND_TIME } from '../actions';

const INITIAL_STATE = {
  selected: false,
  startTimer: false,
  timeLeft: 0,
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOGGLE_SELECTED:
    return {
      ...state,
      selected: !state.selected,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      startTimer: !state.startTimer,
    };
  case SEND_TIME:
    return {
      ...state,
      timeLeft: action.payload.time,
    };
  default:
    return state;
  }
}

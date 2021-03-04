import { TOGGLE_SELECTED, NEXT_QUESTION } from '../actions';

const INITIAL_STATE = {
  selected: false,
  startTimer: false,
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
  default:
    return state;
  }
}

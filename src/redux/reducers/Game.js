import { TOGGLE_SELECTED } from '../actions';

const INITIAL_STATE = {
  selected: false,
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOGGLE_SELECTED:
    return {
      selected: !state.selected,
    };
  default:
    return state;
  }
}

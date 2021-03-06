import { RESTART_TIME } from '../actions/timerAction';

const initialState = {
  funcRestTimer: () => {},
};

export default function (state = initialState, action) {
  console.log(action);
  switch (action.type) {
  case RESTART_TIME:
    return { ...state, funcRestTimer: action.resetTimer };
  default:
    return state;
  }
}

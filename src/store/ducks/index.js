import game from './game';
import user from './user';
import timer from './timer';

// Source: https://itnext.io/passing-state-between-reducers-in-redux-318de6db06cd
const rootReducer = (state = {}, action) => ({
  user: user(state.user, action),
  timer: timer(state.timer, action),
  game: game(state.game, { ...action, timer: state.timer }),
});

export default rootReducer;

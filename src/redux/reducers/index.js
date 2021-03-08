import { combineReducers } from 'redux';
import loginReducer from './Login';
import gameReducer from './Game';
import scoreReducer from './Score';

// const rootReducer = (state, action) => {
//   if (action.type === 'RETURN_LOGIN') {
//     state = undefined
//   }

//   return appReducer(state, action)
// }

const rootReducer = combineReducers({
  login: loginReducer,
  game: gameReducer,
  score: scoreReducer,
});

export default rootReducer;

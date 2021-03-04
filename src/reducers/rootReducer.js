import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import tokenReducer from './tokenReducers';
import perguntaReducers from './perguntaReducer';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({
  login: loginReducer,
  tokenReducer,
  perguntaReducers,
});

export default rootReducer;

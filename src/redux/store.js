import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loginReducer as login,
  configReducer as config,
  questionsReducer as questions,
} from './reducers';

const rootReducer = combineReducers({
  login,
  config,
  questions,
});

const store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk)));

export default store;

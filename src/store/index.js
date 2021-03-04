import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Question from '../reducers/Question';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  Questions: Question,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

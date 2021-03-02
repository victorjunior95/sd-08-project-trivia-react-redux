import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTolls } from 'redux-devtools-extension';
import rootReducers from '../reducers';

const store = createStore(rootReducers);

export default store;

import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

//import settings from '../reducers/settings.reducer';

/*const rootReducer = combineReducers({
  settings,
});

const storeGenerator = () => {
  if (process.env.NODE_ENV === 'production') {
    return createStore(rootReducer, applyMiddleware(thunk));
  }
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

const store = storeGenerator();

export default store;*/

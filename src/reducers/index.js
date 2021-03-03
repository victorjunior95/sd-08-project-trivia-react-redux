import { combineReducers } from 'redux';
import reducerUser from './reducerUser';
import reducerToken from './reducerToken';

const rootReducer = combineReducers({
  reducerUser,
  reducerToken,
});

export default rootReducer;

import { combineReducers } from 'redux';
import requestAPI from './requestAPI';

export default combineReducers({
  triviaAPI: requestAPI,
});

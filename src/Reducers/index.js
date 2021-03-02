import { combineReducers } from 'redux';

import reqApiReducer from './reqApiReducer';

const rootReducers = combineReducers({ reqApiReducer });

export default rootReducers;

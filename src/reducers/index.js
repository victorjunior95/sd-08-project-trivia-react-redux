import { combineReducers } from 'redux';
import login from './login';

const initialState = {
  cars: {
    red: false,
    blue: false,
    yellow: false,
  },
};

function CarReducer(state = initialState, action) {
  switch (action.type) {
  case 'MOVE_CAR':
    return { ...state, cars: { ...state.cars, [action.car]: action.side } };
  default:
    return state;
  }
}
const rootReducer = combineReducers({ login, CarReducer });

export default rootReducer;

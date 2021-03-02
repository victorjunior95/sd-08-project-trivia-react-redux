// Reducers

import { LOGIN, INPUT } from '../actions';

const initialState = {
  email: '',
  nome: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
  case INPUT:
    return {
      ...state,
      [Object.keys(action)[1]]: Object.values(action)[1],
    };
  case LOGIN:
    return {
      ...state,

    };

  default:
    break;
  }
}

export default reducer;

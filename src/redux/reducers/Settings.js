import { SET_CUSTOM_SETTINGS } from '../actions';

initialState = {
  amount: 10,
  category: 'any',
  difficulty: 'any',
  type: 'any',
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
  case SET_CUSTOM_SETTINGS:
    return {
      ...state,
      ...action.payload.state,
    };
  default:
    return state;
  }
}

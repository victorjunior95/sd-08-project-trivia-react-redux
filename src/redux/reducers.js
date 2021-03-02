import { LOGIN, GET_TOKEN, SAVE } from './actions';

export function loginReducer(state = {}, { type, payload }) {
  switch (type) {
  case LOGIN:
    return { ...state, ...payload };
  case GET_TOKEN:
    return { ...state, token: payload };
  default:
    return state;
  }
}

const initialConfigState = {
  category: 'Any Category',
  difficulty: 'Any Difficulty',
  type: 'Any Type',
};

export function configReducer(state = initialConfigState, { type, payload }) {
  switch (type) {
  case SAVE:
    return { ...state, ...payload };
  default:
    return state;
  }
}

import {
  REQUEST_START,
  REQUEST_FAIL,
  ADD_QUESTIONS,
  GET_CATEGORIES,
  SELECT_CATEGORY,
  SELECT_DIFFICULTY,
} from '../action';

const INITIAL_STATE = {
  questions: {},
  score: 0,
  categories: [{ id: '', name: 'Any Category' }],
  category: '',
  difficulty: '',
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_SCORE':
    return { ...state, score: state.score + action.payload.score };
  case REQUEST_START:
    return { ...state, isFetching: true };
  case REQUEST_FAIL:
    return { ...state, isFetching: false, error: action.error };
  case ADD_QUESTIONS:
    return { ...state, isFetching: false, questions: action.questions };
  case GET_CATEGORIES:
    return { ...state, categories: state.categories.concat(action.categories) };
  case SELECT_CATEGORY:
    return { ...state, category: action.category };
  case SELECT_DIFFICULTY:
    return { ...state, difficulty: action.difficulty };
  default:
    return state;
  }
};

export default triviaReducer;

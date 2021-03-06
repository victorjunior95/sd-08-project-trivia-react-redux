import {
  ADD_QUESTIONS,
  ADD_SCORE,
  GET_CATEGORIES,
  REQUEST_FAIL,
  REQUEST_START,
  SELECT_CATEGORY,
  SELECT_DIFFICULTY,
  SELECT_TYPE,
} from '../action';

const INITIAL_STATE = {
  questions: [],
  score: 0,
  categories: [{ id: '', name: 'Any Category' }],
  category: '',
  difficulty: '',
  type: '',
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE:
    return { ...state, score: action.score };
  case ADD_QUESTIONS:
    return { ...state, questions: action.questions };
  case GET_CATEGORIES:
    return {
      ...state,
      categories: state.categories.concat(action.categories),
      isFetching: false,
    };
  case REQUEST_START:
    return { ...state, isFetching: true };
  case REQUEST_FAIL:
    return { ...state, isFetching: false, error: action.error };
  case SELECT_CATEGORY:
    return { ...state, category: action.category };
  case SELECT_DIFFICULTY:
    return { ...state, difficulty: action.difficulty };
  case SELECT_TYPE:
    return { ...state, type: action.type_ };
  default:
    return state;
  }
};

export default triviaReducer;

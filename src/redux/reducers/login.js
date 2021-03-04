import { GET_QUESTIONS, INITIALIZE_GAME, UPDATE_GAME_STATUS } from '../actions';

const initialState = {
  name: 'Vitor',
  email: 'vitornunes200@gmail.com',
  token: '',
  isGameStarted: false,
  numberOfQuestions: 5,
  questions: [],
};

const login = (state = initialState, action) => {
  switch (action.type) {
  case INITIALIZE_GAME:
    return {
      ...state,
      name: action.payload.nickname,
      email: action.payload.email,
      token: action.payload.token,
      isGameStarted: true,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  case UPDATE_GAME_STATUS:
    return {
      ...state,
      isGameStarted: false,
    };
  default:
    return state;
  }
};

export default login;

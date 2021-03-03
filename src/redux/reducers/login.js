import { INITIALIZE_GAME } from '../actions';

const initialState = {
  name: 'Vitor',
  email: 'vitornunes200@gmail.com',
  token: '',
  isGameStarted: false,

};

const login = (state = initialState, action) => {
  switch (action.type) {
  case INITIALIZE_GAME:
    console.log(action);
    return {
      ...state,
      name: action.payload.nickname,
      email: action.payload.email,
      token: action.payload.token,
      isGameStarted: true,
    };
  default:
    return state;
  }
};

export default login;

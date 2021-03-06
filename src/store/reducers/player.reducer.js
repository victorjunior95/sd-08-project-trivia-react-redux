const INITIAL_WINDOW_SIZE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
  maxQuestions: 5,
};

export default function player(state = INITIAL_WINDOW_SIZE, action) {
  const { type, payload } = action;
  switch (type) {
  case 'NEW_PLAYER':
    return { ...state, ...payload };

  default:
    return state;
  }
}

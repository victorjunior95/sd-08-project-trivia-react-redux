const INITIAL_WINDOW_SIZE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
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

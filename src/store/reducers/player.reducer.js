const INITIAL_WINDOW_SIZE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

export default function player(state = INITIAL_WINDOW_SIZE, action) {
  const { type, payload } = action;
  // console.log(payload);
  switch (type) {
  case 'NEW_PLAYER':
    return { ...state, ...payload };

  default:
    return state;
  }
}

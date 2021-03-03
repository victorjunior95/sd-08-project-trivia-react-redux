const INITIAL_WINDOW_SIZE = {
  width: 0,
  height: 0,
};

export default function teste(state = INITIAL_WINDOW_SIZE, action) {
  const { type } = action;
  switch (type) {
  case 'TESTE':
    return { ...state, width: state.width + 1 };

  default:
    return state;
  }
}

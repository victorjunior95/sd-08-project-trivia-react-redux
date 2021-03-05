const initialState = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
};

const createPlayer = (state = initialState, action) => {
  switch (action.type) {
  case 'CREATE_PLAYER':
    return {
      player: {
        name: action.payload.player.name,
        assertions: action.payload.player.assertions,
        score: action.payload.player.score,
        gravatarEmail: action.payload.player.email,
      },
    };
  default:
    return state;
  }
};

export default createPlayer;

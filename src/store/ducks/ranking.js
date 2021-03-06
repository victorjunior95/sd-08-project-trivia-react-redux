import * as storage from '../../services/storage';

export const Types = {
  ADD_PLAYER: 'ADD_PLAYER',
  FETCH_RANKING: 'FETCH_RANKING',
  CLEAR: 'CLEAR',
};

const INITIAL_STATE = {
  list: [],
};

const ranking = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.ADD_PLAYER: {
    const newRanking = [...state.list, action.payload];
    storage.setRanking(newRanking);
    return { ...state, list: newRanking };
  }

  case Types.CLEAR: {
    const newRanking = [];
    storage.setRanking(newRanking);
    return { ...state, list: newRanking };
  }

  case Types.FETCH_RANKING: {
    const newRanking = JSON.parse(storage.getRanking());
    return { ...state, list: newRanking };
  }

  default: return state;
  }
};

export const Creators = {
  addPlayer: (player) => ({
    type: Types.ADD_PLAYER,
    payload: player,
  }),

  fetchRanking: () => ({
    type: Types.FETCH_RANKING,
  }),
};

export default ranking;

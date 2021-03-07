import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './ducks';

import * as triviaApi from '../services/triviaApi';
import * as storage from '../services/storage';
import getGravatarURL from '../services/gravatarApi';

const INITIAL_STATE = {
  auth: {
    token: storage.getToken() || '',
  },
};

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(triviaApi)),
  ),
);

store.subscribe(() => {
  const { game, user, ranking, auth } = store.getState();
  const { assertions, score } = game;
  const { playerName, gravatarEmail } = user;
  const { token } = auth;
  const { list } = ranking;

  storage.updatePlayer({
    score,
    assertions,
    name: playerName,
    picture: getGravatarURL(gravatarEmail),
  });

  storage.setRanking(list);

  storage.saveToken(token);
});

export default store;

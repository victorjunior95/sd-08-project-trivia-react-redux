import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as player from '../core/player';
import * as action from '../actions';

export default function Header() {
  const dispatch = useDispatch();
  const getGravatar = () => player.gravatarUrl(player.getPlayer().player.gravatarEmail);
  const game = useSelector((state) => state.game);
  const DEF_FET = 3;

  const lastGameAssert = game.lastgame.assert || 0;
  // const lastGameScore = game.lastgame.score || 0;
  // const feedbackText = () => (lastGameAssert <= DEF_FET
  //   ? 'Podia ser melhor...'
  //   : 'Mandou bem!');

  useEffect(() => {
    // dispatch(action.updateScore(player.getPlayer().player.score));
    // dispatch(action.updateAssert(player.getPlayer().player.assertions));
  }, []);

  useEffect(() => {
    // console.log(game.score);
    // player.updateScore(game.score);
  }, [game.score]);

  useEffect(() => {
    // console.log(game.assert);
    // player.updateAssert(game.assertions);
  }, [game.assertions]);

  return (
    <header>
      <img data-testid="header-profile-picture" alt="img" src={ getGravatar() } />
      <p data-testid="header-player-name">{ player.getPlayer().player.name}</p>
      <p data-testid="header-score">{ game.score }</p>
      {/* <div data-testid="feedback-text">{feedbackText()}</div> */}
    </header>
  );
}

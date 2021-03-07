import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as trivia from '../../../core/trivia';
import * as player from '../../../core/player';

import ButtonNext from '../../../components/ButtonNext';
import ButtonPlay from '../../../components/ButtonPlay';
import GameRound from './GameRound';

import * as ranking from '../../../core/ranking';
import * as action from '../../../actions';

import {
  GAME_ROUNDS,
  GAME_TIME_LIMIT,
  SECOND,
  SCORE_BASE,
} from '../../../common/Defs';

function GameMatch() {
  const history = useHistory();
  const dispatch = useDispatch();
  // states
  const [time, setTime] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [round, setRound] = useState(null);
  const [matches, setMatches] = useState(0);
  const [done, setDone] = useState(false);
  //

  const gameInit = async () => {
    const data = await trivia.getQuestions();
    dispatch(action.gameMatchReset());
    setMatches(matches + 1);
    setGameOver(false);
    setIsDisabled(false);
    setTime(GAME_TIME_LIMIT);
    setRound(1);
    setDone(false);
    setQuestions(data);
    player.updateScore(0);
    player.updateAssert(0);
  };

  const gameEnd = async () => {
    setIsDisabled(false);
    setTime(null);
    setDone(true);
  };

  useEffect(() => {
    if (!questions) {
      gameInit();
    }
  }, [questions]);

  const gameNext = () => {
    setTime(GAME_TIME_LIMIT);
    setRound(round + 1);
    setIsDisabled(false);
    setDone(false);
    if (round >= GAME_ROUNDS) {
      const rank = {
        name: player.getPlayer().player.name,
        score: player.getPlayer().player.score,
        picture: player.gravatarUrl(player.getPlayer().player.email),
      };
      ranking.saveScore(rank);
      history.push('/feedback');
    }
  };

  const handleChoice = (value) => {
    if (value && time > 0) {
      const ftime = time;
      const points = (questions[round - 1].score * ftime) + SCORE_BASE;
      dispatch(action.updateScore(points));
      dispatch(action.updateAssert(1));
      dispatch(action.gameMatchUpdate(1, points));
      player.updateScore(player.getPlayer().player.score + points);
      player.updateAssert(player.getPlayer().player.assertions + 1);
    }
    setTime(0);
    setDone(true);
  };

  useEffect(() => {
    if (round === GAME_ROUNDS && time === 0) {
      setTimeout(() => {
        gameEnd();
        setGameOver(true);
      }, 1);
    }
  }, [round, time]);

  useEffect(() => {
    const timerTick = setInterval(() => {
      if (time > 0 && !done && round) {
        return setTime(time - 1);
      }
      if (time <= 0 && !done && round) {
        setIsDisabled(true);
        return handleChoice(false);
      }
    }, SECOND);
    return () => {
      clearInterval(timerTick);
    };
  }, [handleChoice]);

  return (
    <div>
      <h1>{time}</h1>
      { questions
      && <GameRound
        question={ questions[round - 1] }
        round={ round }
        onChoice={ handleChoice }
        done={ done }
        isDisabled={ isDisabled }
      /> }
      <br />
      { round <= GAME_ROUNDS && questions && done && <ButtonNext onClick={ gameNext } />}
      <br />
      { gameOver && <ButtonPlay onClick={ gameInit } /> }
    </div>
  );
}

export default GameMatch;

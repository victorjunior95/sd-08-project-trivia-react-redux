import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as trivia from '../../../core/trivia';
import * as player from '../../../core/player';
import GameRound from './GameRound';
import ButtonNext from './ButtonNext';
import ButtonPlay from './ButtonPlay';
import ButtonHome from '../../../components/ButtonHome';

import * as action from '../../../actions';

const DEF_ROUNDS = 5;
const DEF_CTICK = 30;
const DEF_TICK = 1000;

function GameMatch() {
  const history = useHistory();
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.game);

  const [time, setTime] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [questions, setQuestions] = useState(null);
  const [round, setRound] = useState(null);
  // const [score, setScore] = useState(null);
  const [matches, setMatches] = useState(0);
  const [done, setDone] = useState(false);

  const DEF_FET = 3;
  const feedbackText = () => (gameData < DEF_FET
    ? 'Podia ser melhor...'
    : 'Mandou bem!');

  const gameInit = async () => {
    const data = await trivia.getQuestions();
    dispatch(action.gameMatchReset());
    setMatches(matches + 1);
    // setScore(0);
    setGameOver(false);
    setIsDisabled(false);
    setTime(DEF_CTICK);
    setRound(1);
    setDone(false);
    setQuestions(data);
    //
    player.updateScore(0);
    player.updateAssert(0);
  };

  const gameEnd = async () => {
    // setQuestions(null);
    setIsDisabled(false);
    setTime(null);
    // setRound(null);
    setDone(true);
    // console.log('SCORE:', score);
    // history.push('/feedback');
  };

  useEffect(() => {
    if (!questions) {
      gameInit();
    }
  }, [questions]);

  const gameNext = () => {
    setTime(DEF_CTICK);
    setRound(round + 1);
    setIsDisabled(false);
    setDone(false);
  };

  const handleChoice = (value) => {
    if (value && time > 0) {
      const DI_BASE = 10;
      const ftime = time;
      // console.log(questions[round - 1].multi + ftime);
      const points = (questions[round - 1].multi * ftime) + DI_BASE;
      // player.addScorePoints(points);
      dispatch(action.updateScore(points));
      dispatch(action.updateAssert(1));
      dispatch(action.gameMatchUpdate(1, points));
      player.updateScore(player.getPlayer().player.score + points);
      player.updateAssert(player.getPlayer().player.assertions + 1);
    }
    setTime(0);
    setDone(true);
    if (round >= DEF_ROUNDS) {
      history.push('/feedback');
    }
    // console.log(value, score);
  };

  useEffect(() => {
    if (round === DEF_ROUNDS && time === 0) {
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
        return handleChoice(null);
      }
    }, DEF_TICK);
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
      { round < DEF_ROUNDS && questions && done && <ButtonNext onClick={ gameNext } />}
      <br />
      { gameOver && <ButtonPlay onClick={ gameInit } /> }
      <br />
      {round === DEF_ROUNDS && <div data-testid="feedback-text">{feedbackText()}</div>}

      <ButtonHome />
    </div>
  );
}

export default GameMatch;

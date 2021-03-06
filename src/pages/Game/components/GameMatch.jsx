import React, { useState, useEffect } from 'react';

import * as trivia from '../../../core/trivia';
import GameRound from './GameRound';
import ButtonNext from './ButtonNext';
import ButtonPlay from './ButtonPlay';

const DEF_ROUNDS = 5;
const DEF_CTICK = 10;
const DEF_TICK = 1000;
const DEF_TIME = 10000;

function GameMatch() {
  const [timeout, setTimeout] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [round, setRound] = useState(null);
  const [score, setScore] = useState(null);
  const [matches, setMatches] = useState(0);
  const [done, setDone] = useState(false);

  const gameInit = async () => {
    const data = await trivia.getQuestions();
    setMatches(matches + 1);
    setScore(0);
    setTimeout(DEF_CTICK);
    setRound(1);
    setDone(false);
    setQuestions(data);
  };

  const gameEnd = async () => {
    setQuestions(null);
    setTimeout(null);
    setRound(null);
    console.log('SCORE:', score);
  };

  useEffect(() => {
    if (!questions) {
      gameInit();
    }
  }, [questions]);

  const gameNext = () => {
    if (round < DEF_ROUNDS) {
      setTimeout(DEF_CTICK);
      setRound(round + 1);
      return setDone(false);
    }
    return gameEnd();
  };

  const handleChoice = (value) => {
    if (value) {
      setScore(score + 1);
    }
    setDone(true);
    console.log(value);
  };

  useEffect(() => {
    const timerTick = setInterval(() => {
      setTimeout(timeout - 1);
    }, DEF_TICK);
    const timerRound = setTimeout(() => {
      handleChoice(null);
    }, DEF_TIME);
    return () => {
      clearInterval(timerTick);
      clearTimeout(timerRound);
    };
  }, [handleChoice]);

  return (
    <div>
      <h1>{timeout}</h1>
      { questions
      && <GameRound
        question={ questions[round - 1] }
        round={ round }
        onChoice={ handleChoice }
        done={ done }
      /> }

      { round && questions && done && <ButtonNext onClick={ gameNext } />}
      { matches > 0 && !round && !questions
      && <ButtonPlay onClick={ gameInit } /> }
    </div>
  );
}

export default GameMatch;

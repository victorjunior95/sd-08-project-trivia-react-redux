import React, { useState, useEffect } from 'react';

import * as trivia from '../../../core/trivia';
import GameRound from './GameRound';

const DEF_ROUNDS = 5;

function GameMatch() {
  const [questions, setQuestions] = useState(null);
  const [round, setRound] = useState(null);
  const [score, setScore] = useState(null);
  const [matches, setMatches] = useState(0);
  const [done, setDone] = useState(false);

  const gameInit = async () => {
    const data = await trivia.getQuestions();
    setScore(0);
    setRound(1);
    setQuestions(data);
  };

  const gameEnd = async () => {
    setQuestions(null);
    setRound(null);
    setMatches(matches + 1);
    console.log('SCORE:', score);
  };

  useEffect(() => {
    gameInit();
  }, []);

  const gameNext = () => {
    if (round < DEF_ROUNDS) {
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

  return (
    <div>
      { questions
      && <GameRound
        question={ questions[round - 1] }
        onChoice={ handleChoice }
        done={ done }
      /> }
      { round && questions && done
      && <button type="button" onClick={ gameNext }>Proxima!</button> }
      { matches > 0 && !round && !questions
      && <button type="button" onClick={ gameInit }>JOGAR!</button> }
    </div>
  );
}

export default GameMatch;

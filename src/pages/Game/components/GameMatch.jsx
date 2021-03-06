import React, { useState, useEffect } from 'react';

import * as trivia from '../../../core/trivia';
import GameRound from './GameRound';

function GameMatch() {
  const [questions, setQuestions] = useState(null);
  const [round, setRound] = useState(0);

  useEffect(async () => {
    const data = await trivia.getQuestions();
    setQuestions(data);
  }, []);

  const handleChoice = (value) => {
    console.log(value);
    // setRound(round + 1);
  };

  return (
    <div>
      { questions
      && <GameRound
        question={ questions[round] }
        onChoice={ handleChoice }
      /> }
    </div>
  );
}

export default GameMatch;

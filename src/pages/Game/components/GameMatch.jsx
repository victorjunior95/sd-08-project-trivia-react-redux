import React, { useState, useEffect } from 'react';

import * as trivia from '../../../core/trivia';
import GameRound from './GameRound';

function GameMatch() {
  const [questions, setQuestions] = useState(null);
  const [round, setRound] = useState(null);

  useEffect(async () => {
    const data = await trivia.getQuestions();
    setRound(0);
    setQuestions(data);
  }, []);

  // const handleNext = () => {
  //   //
  // };

  return (
    <div>
      {/* { questions && questions.map((question) => (
        <GameRound key={ question.id } question={ question } />
      ))} */}
      { questions
      && <GameRound
        key={ questions[round].id }
        question={ questions[round] }
      /> }
    </div>
  );
}

export default GameMatch;

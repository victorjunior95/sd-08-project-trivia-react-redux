import React, { useState, useEffect } from 'react';

import * as trivia from '../../../core/trivia';
import GameRound from './GameRound';

function GameMatch() {
  const [questions, setQuestions] = useState(null);
  // const [round, setRound] = useState(null);

  useEffect(async () => {
    const data = await trivia.getQuestions();
    setQuestions(data);
  }, []);

  return (
    <div>
      {/* { questions && questions.map((question) => (
        <GameRound key={ question.id } question={ question } />
      ))} */}
      { questions && <GameRound key={ questions[0].id } question={ questions[0] } /> }
    </div>
  );
}

export default GameMatch;

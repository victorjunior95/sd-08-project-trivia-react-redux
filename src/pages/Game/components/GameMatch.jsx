import React, { useState, useEffect } from 'react';

import * as trivia from '../../../core/trivia';
import GameRound from './GameRound';

function GameMatch() {
  const [questions, setQuestions] = useState(null);

  useEffect(async () => {
    const data = await trivia.getQuestions();
    setQuestions(data);
  }, []);

  return (
    <div>
      { questions && questions.map((question) => (
        <GameRound key={ question.id } question={ question } active />
      ))}
    </div>
  );
}

export default GameMatch;

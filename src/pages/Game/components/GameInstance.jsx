import React, { useState, useEffect } from 'react';

import * as trivia from '../../../core/trivia';

function GameInstance() {
  const [questions, setQuestions] = useState(null);

  useEffect(async () => {
    const data = await trivia.getQuestions(5);
    setQuestions(data);
  }, []);

  return (
    <div>
      { questions && questions.map((i, index) => (
        <>
          <span>
            {index + 1}
            {' '}
            -
            {' '}
            {i.question}
          </span>
          <br />
        </>
      ))}
    </div>
  );
}

export default GameInstance;

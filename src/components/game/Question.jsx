import React, { useState, useEffect } from 'react';
import * as trivia from '../../services/trivia';

function Question() {
  const [question, setQuestion] = useState(null);

  const loadQuestion = async () => {
    if (!question) {
      const result = await trivia.getQuestion();
      setQuestion(result);
    }
  };

  useEffect(() => {
    loadQuestion();
  });

  return (
    <div>
      {JSON.stringify(question)}
    </div>
  );
}

export default Question;

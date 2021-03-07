const unitedArray = (data) => {
  const { type,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers } = data;
  if (type === 'boolean') {
    return ([
      { answer: correctAnswer, flag: true },
      { answer: incorrectAnswers, flag: false },
    ]);
  }
  return ([
    { answer: correctAnswer, flag: true },
    { answer: incorrectAnswers[0], flag: false },
    { answer: incorrectAnswers[1], flag: false },
    { answer: incorrectAnswers[0], flag: false },
  ]);
};

export default unitedArray;

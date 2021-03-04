import React, { useEffect, useState } from 'react';
import Header from '../../components/HeaderJogo';
import { getAnswers } from '../../services';

const token = localStorage.getItem('token');

const Jogo = () => {
  const [questions, setQuestions] = useState({
    category: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
  });

  useEffect(() => {
    getAnswers(token)
      .then((response) => response.results[1])
      .then(setQuestions);
  }, []);

  return (
    <main>
      <Header />
      <p>Categoria</p>
      <span data-testid="question-category">{ questions.category }</span>
      <p>Pergunta</p>
      <span data-testid="question-text">{ questions.question }</span>
      <p>Respostas</p>
      <button
        type="button"
        data-testid="correct-answer"
      >
        { questions.correct_answer }
      </button>
      {questions.incorrect_answers.map((answer, index) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ answer }
        >
          { answer }
        </button>)) }
    </main>
  );
};

export default Jogo;

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

  const NUMBER_SORT = 0.5;
  const answers = [questions.correct_answer, ...questions.incorrect_answers];
  const sortAnswers = answers.sort(() => NUMBER_SORT - Math.random());

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
      {sortAnswers.map((answer, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `wrong-answer-${index}` }
        >
          { answer }
        </button>)).sort() }
    </main>
  );
};

export default Jogo;

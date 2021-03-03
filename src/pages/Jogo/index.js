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
      <p data-testeid="question-category">Categoria</p>
      { questions.category }
      <p data-testeid="question-text">Pergunta</p>
      { questions.question }
      <p data-testeid="correct-answer">Respostas</p>
      { questions.correct_answer }
      { questions.incorrect_answers }
      <button type="button">clicar</button>
    </main>
  );
};

export default Jogo;

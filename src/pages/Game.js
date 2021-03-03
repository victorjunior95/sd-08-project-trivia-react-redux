import React, { Component } from 'react';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    // this.handleInput = this.handleInput.bind(this);
    // this.validar = this.validar.bind(this);
    this.APIQuestions = this.APIQuestions.bind(this);
    this.oneQuestion = this.oneQuestion.bind(this);
    this.renderizaQuestion = this.renderizaQuestion.bind(this);
  }

  async getQuestions() {
    const json = await this.APIQuestions();
    const arr = [];
    for (let i = 0; i < json.length; i += 1) {
      arr.push(json[i].question);
    }
    console.log(arr);
  }

  async APIQuestions() {
    const tokenn = localStorage.getItem('token');
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${tokenn}`;
    const request = await fetch(endpoint);
    const json = await request.json();
    return json.results;
  }

  // eslint-disable-next-line react/sort-comp
  async oneQuestion() {
    const questions = await this.APIQuestions();
    const question = questions[0];
    const question1 = question.question;
    console.log(question1);
    return question1;
  }

  async oneAnswers() {
    const questions = await this.APIQuestions();
    const question = questions[0];
    const question1 = question.results;
    return question1;
  }

  renderizaQuestion() {
    const question = this.oneQuestion();
    console.log(question);
    // return (
    //   <h1>{a}</h1>
    // );
  }

  render() {
    this.getQuestions()
    // this.oneQuestion()
    return (
      <div>
        <Header />
        aaa
        {/* { this.renderizaQuestion()} */}
      </div>
    );
  }
}

export default Game;
// https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}

// 5. Crie a página de jogo que deve conter as informações relacionadas à pergunta
// PRIORIDADE 1 - Deve ser feita a requisição para a API para popular o jogo com as perguntas, categoria e alternativas

// Observações técnicas

// A pergunta e suas alternativas de resposta devem ser recebidas da API do Trivia
// A categoria da pergunta (campo category) deve ser exibida em um elemento com o atributo data-testid com o valor question-category para a pessoa que está jogando
// O texto da pergunta (campo question) deve ser exibido em um elemento com o atributo data-testid com o valor question-text para a pessoa que está jogando
// O texto com as alternativas devem ser exibidos seguindo as regras abaixo:
// O elemento com a alternativa correta deve possuir o atributo data-testid com o valor correct-answer
// Os elementos com as alternativas incorretas devem possuir o atributo data-testid com o valor wrong-answer-${index}, com ${index} iniciando com o valor 0
// As alternativas devem ser exibidas em ordem aleatória
// Dica: utilize botões (<button/>) para as alternativas

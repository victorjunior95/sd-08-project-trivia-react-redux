import React, { Component } from 'react';
import Header from '../components/Header';
import getQuestions from '../services/questionsAPI';


// 0:
// category: "General Knowledge"
// correct_answer: "True"
// difficulty: "easy"
// incorrect_answers: ["False"]
// question: "French is an official language in Canada."
// type: "boolean"
// (index)
// category
// type
// difficulty
// question
// correct_answer
// incorrect_answers
// Value - só pro Token

// if(multiple){ apresntar 4 respostas  em ordem aleatorio  }{ apresentar 2 resposatas  }

export default class Questions extends Component {
  constructor(){
    super();
    this.state = {
      questions: {},
      scorePlayer: 0,
      positionQuestion: 0,
      totalQuestions: 0,
    }
  }
  componentDidMount() {
    //const { fetchCurrenciesData } = this.props;
    getQuestions();
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

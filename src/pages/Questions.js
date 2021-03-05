import React, { Component } from 'react';
import Header from '../components/Header';
import { getQuestions } from '../services/questionsAPI';

export default class Questions extends Component {
  constructor(){
    super();
    this.state = {
      category: '',
      question: '',
      correct: '',
      incorrect: [],
      isLoaded: false,
    };
  }
  componentDidMount(){
    const token =  localStorage.getItem('token');
    getQuestions(token, 5)
    .then((response) => response.results[0])
    .then((data) => this.setState({
      category: data.category,
      question: data.question,
      correct: data.correct_answer,
      incorrect: data.incorrect_answers,
      isLoaded: true,
    }));
  }
  
  render() {
    // [{texto: "", isCorrect: true, index: 0}]
    //var item = items[Math.floor(Math.random() * items.length)];
    const { category , question , correct , incorrect , isLoaded} = this.state;
    // const answers = [correct, ...incorrect];
    const randomAnswer = () => {
    let answers = incorrect.map((inco,index) =>{
        const results={};
        results.texto= inco;
        results.isCorrect= false;
        results.index= index;
        return results;
      })
    answers.push({texto: correct, isCorrect: true, index: (incorrect.length+1)} );
    answers = answers.sort(() => Math.random() - 0.5);
    return answers;
    }
    if(!isLoaded){
      return(
        <>Loading</>
      )
    } return (
      <div>
        <Header />
        <p data-testid="question-category">
          { category }
        </p>
        <p data-testid="question-text">
          { question }
        </p>
        { randomAnswer().map( (answer) => {
          if(answer.isCorrect){
        return <button key={ `${answer.index}` } data-testid={ `correct-answer-${answer.index}` }> {answer.texto} </button> 
        } else {
          return <button key={ `${answer.index}` } data-testid={ `wrong-answer-${answer.index}` }> {answer.texto} </button>
        }
          } )}
      </div>
    
  );
}
}

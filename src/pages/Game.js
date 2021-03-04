import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

// import { changeState } from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      green: '',
      red: '',
      wrongAnswers: '',
    };
    // this.handleInput = this.handleInput.bind(this);
    this.getQuestionsAndAnswers = this.getQuestionsAndAnswers.bind(this);
    this.APIQuestions = this.APIQuestions.bind(this);
    // this.oneQuestion = this.oneQuestion.bind(this);
    this.renderizaQuestion = this.renderizaQuestion.bind(this);
    // this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    this.getQuestionsAndAnswers();
  }

  async getQuestionsAndAnswers() {
    const json = await this.APIQuestions();
    const questions = [];
    for (let i = 0; i < json.length; i += 1) {
      questions.push(json[i].question);
    }
    const categories = [];
    for (let i = 0; i < json.length; i += 1) {
      categories.push(json[i].category);
    }
    const correctsAnswers = [];
    for (let i = 0; i < json.length; i += 1) {
      correctsAnswers.push(json[i].correct_answer);
    }
    const wrongAnswers = [];
    for (let i = 0; i < json.length; i += 1) {
      wrongAnswers.push(json[i].incorrect_answers);
    }
    this.setState({
      categories,
      questions,
      correctsAnswers,
      wrongAnswers });
  }

  // changeState(car, side) {
  //   return {
  //     type: 'MOVE_CAR',
  //     car,
  //     side,
  //   };
  // }

  async APIQuestions() {
    try {
      const tokeen = localStorage.getItem('token');
      const endpoint = `https://opentdb.com/api.php?amount=5&token=${tokeen}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      return data.results;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  // eslint-disable-next-line react/sort-comp
  // async oneQuestion() {
  //   const questions = await this.APIQuestions();
  //   const question = questions[0];
  //   const question1 = question.question;
  //   console.log(question1);
  //   return question1;
  // }

  // async oneAnswers() {
  //   const questions = await this.APIQuestions();
  //   const question = questions[0];
  //   const question1 = question.results;
  //   return question1;
  // }

  renderizaQuestion() {
    const { correctAnswer, changeState } = this.props;
    const { wrongAnswers } = this.state;
    if (wrongAnswers === '') {
      return (
        <div>
          <div data-testid="question-text">LOADING...</div>
          <div data-testid="correct-answer">LOADING...</div>
          <div data-testid="wrong-answer">LOADING...</div>
        </div>
      );
    }
    const { questions, correctsAnswers, categories, green, red } = this.state;
    const question1 = questions[0];
    const answer = correctsAnswers[0];
    const wrongs = wrongAnswers[0];
    const category = categories[0];
    return (
      <div>
        <h2 data-testid="question-category">
          {' '}
          Categoria :
          {' '}
          {category}

        </h2>
        {/* onClick={ () => console.log('oi') } onKeyPress={ this.handleKeyPress } */}
        <h1 data-testid="question-text">{question1}</h1>

        <button
          type="button"
          onClick={ () => { changeState('blue', !correctAnswer); this.setState({ green: 'green' }); } }
          data-testid="correct-answer"
          className={ green }
        >
          {answer}

        </button>

        {wrongs && wrongs.map((item, index) => (
          <button
            type="button"
            key={ item }
            onClick={ () => changeState('blue', !correctAnswer) }
          >
            <h2
              key={ item }
              data-testid={ `wrong-answer-${index}` }
              className={ correctAnswer ? 'red' : 'normal' }

            >
              {item}
            </h2>
          </button>
        ))}

      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderizaQuestion()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  correctAnswer: state.CarReducer.cars.blue,
  incorrectAnswers: state.CarReducer.cars.red,
});

const mapDispatchToProps = (dispatch) => ({
  changeState: (car, side) => dispatch({
    type: 'MOVE_CAR',
    car,
    side,
  }),
});

Game.propTypes = {
  correctAnswer: PropTypes.bool.isRequired,
  changeState: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);

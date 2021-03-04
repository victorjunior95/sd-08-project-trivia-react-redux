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
      wrongAnswers: '',
      number: 0,
    };
    // this.handleInput = this.handleInput.bind(this);
    // this.getQuestionsAndAnswers = this.getQuestionsAndAnswers.bind(this);
    // this.APIQuestions = this.APIQuestions.bind(this);
    // this.oneQuestion = this.oneQuestion.bind(this);
    this.renderizaQuestion = this.renderizaQuestion.bind(this);
    // this.changeState = this.changeState.bind(this);
  }

  // componentDidMount() {
  //   this.getQuestionsAndAnswers();
  // }

  // changeState(car, side) {
  //   return {
  //     type: 'MOVE_CAR',
  //     car,
  //     side,
  //   };
  // }

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
    const { correctAnswer, changeState, questions, wrongAnswers,
      correctsAnswers, categories } = this.props;
    const { number } = this.state;
    // if (questions.length > 0) {
    // const { wrongAnswers } = this.state;
    // if (wrongAnswers === '') {
    //   return (
    //     <div>
    //       <div data-testid="question-text">LOADING...</div>
    //       <div data-testid="correct-answer">LOADING...</div>
    //       <div data-testid="wrong-answer">LOADING...</div>
    //     </div>
    //   );
    // }
      const { green } = this.state;
      const question1 = questions[number];
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
            onClick={ () => { this.setState({ green: 'green' }); } }
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
    // return (<div>LOADING...</div>);
  // }

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
  correctsAnswers: state.login.userr.correctsAnswers,
  wrongAnswers: state.login.userr.wrongAnswers,
  categories: state.login.userr.categories,
  questions: state.login.userr.questions,
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

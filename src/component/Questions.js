import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      correctAnswerClass: '',
      incorrectAnswersClass: '',
      questionIndex: 0,
      nextBtn: false,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    const { questionIndex } = this.state;
    const totalQuestions = 4;
    this.setState({ nextBtn: false });
    if (questionIndex < totalQuestions) {
      this.setState({
        questionIndex: questionIndex + 1,
        correctAnswerClass: '',
        incorrectAnswersClass: '',
      });
    }
  }

  handleQuestions() {
    this.setState({
      correctAnswerClass: 'correct-answer',
      incorrectAnswersClass: 'incorrect-answers',
      nextBtn: true,
    });
  }

  randomizeAnswers(answers) {
    const randomize = 0.5;
    return answers.sort(() => Math.random() - randomize);
  }

  buttonNext() {
    const { nextBtn } = this.state;
    return (
      <button
        type="button"
        className={ nextBtn ? 'next-btn-visible' : 'next-btn-visible-hidden' }
        data-testid="btn-next"
        onClick={ this.nextQuestion }
      >
        Próxima
      </button>
    );
  }

  lastButton() {
    return (
      <Link to="/feedback">
        <button
          type="button"
          data-testid="btn-next"
        >
          Próxima
        </button>
      </Link>
    );
  }

  renderQuestions(correctAnswer, incorrectAnswers) {
    const { correctAnswerClass, incorrectAnswersClass } = this.state;
    const wrongAnswers = [];
    const rightAnswer = (
      <button
        type="button"
        data-testid="correct-answer"
        key="correct-answer"
        className={ correctAnswerClass }
        onClick={ () => this.handleQuestions() }
      >
        { correctAnswer }
      </button>
    );

    incorrectAnswers.map((answer, index) => {
      wrongAnswers.push(
        <button
          key={ index }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          className={ incorrectAnswersClass }
          onClick={ () => this.handleQuestions() }
        >
          { answer }
        </button>,
      );
      return null;
    });

    const answers = [rightAnswer, ...wrongAnswers];
    return this.randomizeAnswers(answers);
  }

  render() {
    const { gameState: { questions, isFetching } } = this.props;
    const { questionIndex } = this.state;
    const lastQuestion = 4;
    if (!isFetching) {
      const {
        category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questions[questionIndex];
      console.log(questionIndex);
      return (
        <div>
          <h2 data-testid="question-category">
            Categoria:
            { category }
          </h2>
          <h2 data-testid="question-text">
            Pergunta:
            { question }
          </h2>
          <div>
            { this.renderQuestions(correctAnswer, incorrectAnswers) }
          </div>
          { questionIndex === lastQuestion
            ? this.lastButton()
            : this.buttonNext() }
        </div>
      );
    }
    return (
      <p>Loading...</p>
    );
  }
}

const mapStateToProps = (state) => ({
  gameState: state.game,
});

Questions.propTypes = {
  gameState: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Questions);

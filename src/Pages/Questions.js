import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../App.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      disabled: false,
      invisible: true,
      time: 30,
      dificuldade: {
        hard: 3,
        medium: 2,
        easy: 1,
      },
      totalScore: 0,
    };
    this.mainReder = this.mainRender.bind(this);
    this.disabledAnswers = this.disabledAnswers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.timer = this.timer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(this.timer, ONE_SECOND);
  }

  disabledAnswers() {
    this.setState({
      disabled: true,
      invisible: false,
    });
    clearInterval(this.intervalId);
  }

  nextQuestion() {
    const { questionNumber } = this.state;
    const { history } = this.props;
    const four = 4;
    this.setState({
      questionNumber: questionNumber + 1,
      disabled: false,
      invisible: true,
    });
    if (questionNumber === four) return history.push('/feedback');
  }

  timer() {
    const { time } = this.state;
    const newTime = time - 1;
    this.setState({
      time: newTime,
    });
    if (newTime === 0) { this.disabledAnswers(); }
  }

  resetTimer() {
    this.setState({
      time: 30,
    });
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(this.timer, ONE_SECOND);
  }

  correctAnswer() {
    const { time, dificuldade, questionNumber, totalScore } = this.state;
    const { questions } = this.props;
    const hardCore = questions.results[questionNumber].difficulty;
    const ten = 10;
    const score = totalScore + ten + (time * dificuldade[hardCore]);
    this.setState({
      totalScore: score,
    });
    const localValue = JSON.parse(localStorage.getItem('state'));
    localValue.player.score = score;
    localValue.player.assertions += 1;
    localStorage.setItem('state', JSON.stringify(localValue));
  }

  mainRender() {
    const { questionNumber, disabled, time } = this.state;
    const { questions } = this.props;
    const dorEsofrimento = questions.results;
    const question = dorEsofrimento[questionNumber];
    return (
      <main>
        <p>{time}</p>
        <p data-testid="question-category">{question.length && question.category }</p>
        <p data-testid="question-text">{question.question}</p>
        {question.incorrect_answers.map((key, index) => (
          <button
            className="wrong-answer"
            disabled={ disabled }
            data-testid={ `wrong-answer-${index}` }
            key={ key }
            type="button"
            onClick={ this.disabledAnswers }
          >
            {key}

          </button>
        ))}
        <button
          className="correct-answer"
          disabled={ disabled }
          data-testid="correct-answer"
          type="button"
          onClick={ () => { this.disabledAnswers(); this.correctAnswer(); } }
        >
          {question.correct_answer}

        </button>
      </main>
    );
  }

  render() {
    const { invisible, totalScore } = this.state;
    const { loading } = this.props;
    return (
      <div>
        <Header score={ totalScore } />
        <div>
          {(loading) ? <p>loading..</p> : this.mainRender()}
        </div>
        <button
          onClick={ () => { this.nextQuestion(); this.resetTimer(); } }
          hidden={ invisible }
          data-testid="btn-next"
          type="button"
        >
          Próxima

        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.allQuestions,
  loading: state.question.loading,
});

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Questions);

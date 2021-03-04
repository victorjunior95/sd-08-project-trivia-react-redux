import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import requestQuestion from '../../actions/getQuestions';
import stopTimerAction from '../../actions/stopTimerAction';
import '../../styles/Main.css';
import Timer from './Timer';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      indexOfQuestion: 0,
      isFetching: true,
    };

    this.randomOptions = this.randomOptions.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.clickAnwser = this.clickAnwser.bind(this);
  }

  componentDidMount() {
    this.randomOptions();
  }

  async randomOptions() {
    const { token, requestQuestionAction } = this.props;
    await requestQuestionAction(token);
    const { questions } = this.props;
    const { indexOfQuestion } = this.state;
    const quest = questions.results[indexOfQuestion];

    const PROBABILITY = 0.5;
    const answers = [quest.correct_answer, ...quest.incorrect_answers];
    const sortedAnswers = answers.sort(() => Math.random() - PROBABILITY);

    this.setState({
      category: quest.category,
      question: quest.question,
      answers: sortedAnswers,
      isFetching: false,
    });
  }

  clickAnwser() {
    const { stopTimer } = this.props;
    const btns = document.querySelectorAll('.answer');
    btns.forEach((btn) => {
      if (btn.name === 'correct') {
        btn.classList.add('correct');
        btn.disabled = true;
      } else {
        btn.classList.add('incorrect');
        btn.disabled = true;
      }
    });
    stopTimer();
  }

  renderOptions() {
    const { answers, indexOfQuestion } = this.state;
    const { questions } = this.props;
    const rightAnswer = questions.results[indexOfQuestion].correct_answer;

    const MENOS_UM = -1;
    let initialIndex = MENOS_UM;
    const result = answers.map((e, index) => {
      if (e === rightAnswer) {
        return (
          <button
            name="correct"
            className="answer"
            type="button"
            key={ index }
            data-testid="correct-answer"
            onClick={ this.clickAnwser }
          >
            {e}
          </button>);
      }
      initialIndex += 1;
      return (
        <button
          name="incorrect"
          className="answer"
          type="button"
          key={ index }
          data-testid={ `wrong-answer-${initialIndex}` }
          onClick={ this.clickAnwser }
        >
          {e}
        </button>);
    });
    return result;
  }

  render() {
    const { isFetching, category, question } = this.state;
    return (
      <main className="main-body">
        {!isFetching && <Timer disableBtn={ this.clickAnwser } />}

        <div className="main-content">
          <p>
            categoria:
            <span data-testid="question-category">{category}</span>
          </p>
          <p className="question" data-testid="question-text">{question}</p>
          <div className="button-container">
            {!isFetching && this.renderOptions()}
          </div>
        </div>

      </main>
    );
  }
}

Main.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  requestQuestionAction: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  requestQuestionAction: (value) => dispatch(requestQuestion(value)),
  stopTimer: () => dispatch(stopTimerAction()),
});

const mapStateToProps = (state) => ({
  token: state.getTokenReducer.token,
  questions: state.getQuestions.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

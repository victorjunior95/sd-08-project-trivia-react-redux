import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions as fetchQuestionsThunk } from '../../actions';

class GameQuestions extends Component {
  constructor() {
    super();

    this.state = {
      questionNumber: 0,
      timerCounter: 30,
      isTimeOver: false,
    };

    this.renderQuestionInfo = this.renderQuestionInfo.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions, token } = this.props;
    fetchQuestions(token);
    this.timer();
  }

  // componentWillUnmount() {
  // }

  // getQuestionInfo() {
  //   const { questionNumber } = this.state;
  //   const { questions } = this.props;
  //   console.log(questions);
  //   const question = Object.assign(questions[questionNumber]);
  //   return this.renderQuestionInfo(question);
  // }

  timer() {
    const ONE_SECOND = 1000;
    this.timer = setInterval(() => {
      const { timerCounter } = this.state;
      if (timerCounter === 0) {
        this.setState({
          isTimeOver: true,
        });
        clearInterval(this.timer);
        return;
      }

      this.setState(() => ({
        timerCounter: timerCounter - 1,
      }));
    }, ONE_SECOND);
  }

  // shuffleAnswers(correct, incorrect) {
  //   const HALF = 0.5;
  //   const allAnswers = [correct, ...incorrect];
  //   return allAnswers.sort(() => HALF - Math.random());
  // }

  renderQuestionInfo() {
    // const allAnswers = this.shuffleAnswers(correctAnswer, incorrectAnswers);
    const { questions } = this.props;
    const { shufledAnswers, questionNumber } = this.props;
    const { isTimeOver } = this.state;
    console.log(shufledAnswers[questionNumber]);
    const { category, question, correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } = questions[questionNumber];

    return (
      <section>
        <h1 data-testid="question-category">
          {category}
        </h1>
        <h2 data-testid="question-text">
          {question}
        </h2>
        { shufledAnswers[questionNumber] // https://developer.mozilla.org/pt-BR/docs/Glossary/Falsy e https://developer.mozilla.org/pt-BR/docs/Glossary/Truthy
            && shufledAnswers[questionNumber].map((answer) => {
              if (answer === correctAnswer) {
                return (
                  <button
                    key={ answer }
                    data-testid="correct-answer"
                    type="button"
                    disabled={ isTimeOver }
                  >
                    {answer}
                  </button>
                );
              }
              return (
                <button
                  key={ answer }
                  data-testid={ `wrong-answer-${questionNumber}` }
                  type="button"
                  disabled={ isTimeOver }
                >
                  {answer}
                </button>
              );
            })}
      </section>
    );
  }

  render() {
    const { timerCounter } = this.state;
    return (
      <main>
        <div>
          <section>
            <h2>{timerCounter}</h2>
          </section>
          {this.renderQuestionInfo()}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.reducerToken.id,
  questions: state.reducerQuestions.questions,
  shufledAnswers: state.reducerQuestions.shufledAnswers,
  questionNumber: state.reducerQuestions.questionNumber,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(fetchQuestionsThunk(token)),
});

GameQuestions.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.objectOf(String).isRequired,
  shufledAnswers: PropTypes.arrayOf(PropTypes.array).isRequired,
  questionNumber: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);

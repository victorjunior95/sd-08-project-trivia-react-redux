import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctColor: '',
      incorrectColor: '',
      buttonNext: false,
      questionIndex: 0,
      time: 30,
      disabled: false,
    };

    this.changeColors = this.changeColors.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    // const { fetchQuestions } = this.props;
    // fetchQuestions();
    const token = localStorage.getItem('token');
    console.log(token);
    const oneSecond = 1000;
    this.intervalId = setInterval(this.timer, oneSecond);
  }

  timer() {
    const { time } = this.state;
    const updateTime = time - 1;
    this.setState({
      time: updateTime,
    });
    if (updateTime === 0) {
      this.changeColors();
      clearInterval(this.intervalId);
    }
  }

  nextButton() {
    const { buttonNext } = this.state;
    if (buttonNext) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.nextPage }
        >
          Próxima pergunta
        </button>
      );
    }
  }

  nextPage() {
    const { questionIndex } = this.state;
    const { history } = this.props;
    const number = 4;

    if (questionIndex === number) {
      history.push('/feedback');
    }
    this.setState({
      correctColor: '',
      incorrectColor: '',
      buttonNext: false,
      disabled: false,
      time: 30,
      questionIndex: questionIndex + 1,
    });
  }

  changeColors() {
    this.setState({
      correctColor: 'rgb(6, 240, 15)',
      incorrectColor: 'rgb(255, 0, 0)',
      buttonNext: true,
      disabled: true,
    });
    // this.nextButton();
  }

  render() {
    const { questions, loading } = this.props;
    const {
      correctColor,
      incorrectColor,
      questionIndex,
      buttonNext,
      disabled,
      time,
    } = this.state;

    if (loading) return <p>loading</p>;

    return (
      <>
        <Header />
        <form>
          <p>{time}</p>
          <p data-testid="question-category">
            Categoria:
            {questions[questionIndex].category}
          </p>
          <p data-testid="question-text">
            Pergunta:
            {questions[questionIndex].question}
          </p>

          {
            questions[questionIndex].incorrect_answers.map((key, index = 0) => (
              <button
                type="button"
                key={ key }
                disabled={ disabled }
                data-testid={ `wrong-answer-${index}` }
                style={ { border: `3px solid ${incorrectColor}` } }
                onClick={ this.changeColors }
              >
                {key}
              </button>
            ))
          }

          <button
            type="button"
            disabled={ disabled }
            data-testid="correct-answer"
            className="correct"
            style={ { border: `3px solid ${correctColor}` } }
            onClick={ this.changeColors }
          >
            {questions[questionIndex].correct_answer}
          </button>
        </form>
        <div>
          { buttonNext && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ () => this.nextPage() }
            >
              Próxima pergunta
            </button>
          ) }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  loading: state.questions.loading,
  teste: state.questions.questions,
});

// const mapDispatchToProps = (dispatch) => ({
//   fetchQuestions: () => dispatch(fetchQuestionsThunk()),
// });

Game.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);

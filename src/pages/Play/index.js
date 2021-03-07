import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header';

const MAX_NUMBER_FIRST = 4;
const MAX_NUMBER = 3;
class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      answerIsClicked: false,
      indexQuestion: 0,
    };
    this.createMultipleQuestions = this.createMultipleQuestions.bind(this);
    this.ramdomizeAnswers = this.ramdomizeAnswers.bind(this);
    this.renderType = this.renderType.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
    this.handleClickAnswers = this.handleClickAnswers.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.redirectTofeedBack = this.redirectTofeedBack.bind(this);
    this.handleClickNextButton = this.handleClickNextButton.bind(this);
  }

  changeQuestion() {
    console.log('changeQuestion');
    this.setState((prevState) => ({
      indexQuestion: prevState.indexQuestion += 1,
      answerIsClicked: false,
    }));
  }

  redirectTofeedBack() {
    const { history } = this.props;
    history.push('/feedback');
  }

  handleClickNextButton() {
    console.log('handleClickNextButton');
    const FOUR = 4;
    const { indexQuestion } = this.state;
    if (indexQuestion < FOUR) {
      this.changeQuestion();
    } else {
      this.redirectTofeedBack();
    }
  }

  handleClickAnswers() {
    // Aquificarão todas as funções dos botões de resposta
    console.log('handleClickAnswers');
    this.setState({ answerIsClicked: true });
  }

  ramdomizeAnswers() {
    const positions = [];
    positions.push(Math.round(Math.random() * MAX_NUMBER_FIRST));
    while (positions.length < MAX_NUMBER_FIRST) {
      const number = Math.round(Math.random() * MAX_NUMBER);
      if (!positions.includes(number)) {
        positions.push(number);
      }
    }
    return positions;
  }

  createMultipleQuestions() {
    const { data } = this.props;
    const { indexQuestion } = this.state;
    console.log(indexQuestion);

    const positions = this.ramdomizeAnswers();

    const incorrectAnswers = data.results[indexQuestion].incorrect_answers.map(
      (incorrectAnswer, index) => ({
        content: incorrectAnswer,
        status: `wrong-answer-${index}`,
      }),
    );

    const correctAnswer = { content: data.results[indexQuestion].correct_answer,
      status: 'correct-answer' };

    const allAnswers = [...incorrectAnswers, correctAnswer];

    return (
      <div>
        <button
          type="button"
          data-testid={ allAnswers && allAnswers[positions[0]].status }
          onClick={ this.handleClickAnswers }
        >
          {allAnswers[positions[0]].content}
        </button>
        <button
          type="button"
          data-testid={ allAnswers && allAnswers[positions[1]].status }
          onClick={ this.handleClickAnswers }
        >
          {allAnswers[positions[1]].content}
        </button>
        <button
          type="button"
          data-testid={ allAnswers && allAnswers[positions[2]].status }
          onClick={ this.handleClickAnswers }
        >
          {allAnswers[positions[2]].content}
        </button>
        <button
          type="button"
          data-testid={ allAnswers && allAnswers[positions[3]].status }
          onClick={ this.handleClickAnswers }
        >
          {allAnswers[positions[3]].content}
        </button>
        <div>
          {this.renderNextButton(allAnswers)}
        </div>
      </div>
    );
  }

  renderNextButton(allAnswers) {
    const { answerIsClicked } = this.state;
    if (allAnswers && answerIsClicked) {
      return (
        <div>
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleClickNextButton }
          >
            Próxima
          </button>
        </div>
      );
    }
  }

  renderType() {
    const { indexQuestion } = this.state;
    const { data } = this.props;
    if (data.results[indexQuestion].type === 'multiple') {
      return (
        this.createMultipleQuestions()
      );
    }
    return (
      <div>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleClickAnswers }
        >
          Verdadeiro
        </button>
        <button
          type="button"
          data-testid="wrong-answer-0"
          onClick={ this.handleClickAnswers }
        >
          Falso
        </button>
        <div>
          {this.renderNextButton([])}
        </div>
      </div>
    );
  }

  renderQuestions() {
    const { data, isFetching } = this.props;
    const { indexQuestion } = this.state;

    if (isFetching !== true) {
      return (
        <div className="container">
          <span data-testid="question-category">
            {
              data.results && data.results[indexQuestion].category
            }
          </span>
          <div className="container-questions-answers">
            <div className="questions">
              <p data-testid="question-text">
                {
                  data.results && data.results[indexQuestion].question
                }
              </p>
            </div>
            <div className="answers" />
          </div>
          <div className="container-timer-button">
            <div className="timer" />
            <div className="container-button">
              {this.renderType()}
            </div>
          </div>
        </div>
      );
    }
    return (<div>Loading...</div>);
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderQuestions()}
      </div>
    );
  }
}

Play.propTypes = {
  data: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  data: state.questions.data,
  isFetching: state.questions.isFetching,
});

export default connect(mapStateToProps)(Play);

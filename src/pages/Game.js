import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getRequest } from '../services/index';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    const { getApi } = this.props;
    getApi();
  }

  handleNext() {
    const { index } = this.state;
    this.setState({
      index: index + 1,
    });
  }

  renderQuestions() {
    const { index } = this.state;
    const { questions } = this.props;
    // const incorrect = questions[index].incorrect_answers;
    const questionsArray = questions && questions.length
      ? [...questions[index].incorrect_answers, questions[index].correct_answer] : [];
    const obj = [
      { correct: questions && questions.length && questions[index].correct_answer },
      { incorrect: questions && questions.length && [...questions[index].incorrect_answers] },
    ];
    console.log(obj);
    return (
      <div>
        <p data-testid="question-category">
          {questions && questions.length && questions[index].category}
        </p>
        <h5 data-testid="question-text">
          {questions && questions.length && questions[index].question}
        </h5>
        <section>
          {/* {incorrect
            .map((answer, i) => (
              <button
                data-testid={ `wrong-answer-${i}` }
                key={ answer }
                type="button"
              >
                {answer}
              </button>
            ))} */}
          {questions && questions.length && questionsArray.map((answer, i) => {
            if (answer === questions[index].correct_answer) {
              return <button type="button" data-testid="correct-answer">{answer}</button>;
            }
            return (
              <button type="button" key={ answer } data-testid={ `wrong-answer-${i}` }>
                {answer}
              </button>);
          })}
        </section>
        <button type="button">Próxima</button>
      </div>
    );
  }

  render() {
    // const { loading } = this.props;
    // if (loading) return <p>Loading</p>;
    return (
      <div>
        <Header />
        <section>
          {this.renderQuestions() }
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(getRequest()),
});

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  loading: state.game.loading,
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
  })).isRequired,
  getApi: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

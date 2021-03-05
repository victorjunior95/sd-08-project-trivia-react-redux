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
    };

    this.changeColors = this.changeColors.bind(this);
  }

  componentDidMount() {
    // const { fetchQuestions } = this.props;
    // fetchQuestions();
    const token = localStorage.getItem('token');
    console.log(token);
  }

  changeColors() {
    this.setState({
      correctColor: 'rgb(6, 240, 15)',
      incorrectColor: 'rgb(255, 0, 0)',
    });
  }

  render() {
    const { questions, loading } = this.props;
    const { correctColor, incorrectColor } = this.state;

    if (loading) return <p>loading</p>;

    return (
      <>
        <Header />
        <form>
          <p data-testid="question-category">
            Categoria:
            {questions[0].category}
          </p>
          <p data-testid="question-text">
            Pergunta:
            {questions[0].question}
          </p>

          {
            questions[0].incorrect_answers.map((key, index = 0) => (
              <button
                type="button"
                key={ key }
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
            data-testid="correct-answer"
            className="correct"
            style={ { border: `3px solid ${correctColor}` } }
            onClick={ this.changeColors }
          >
            {questions[0].correct_answer}
          </button>
        </form>
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
};

export default connect(mapStateToProps)(Game);

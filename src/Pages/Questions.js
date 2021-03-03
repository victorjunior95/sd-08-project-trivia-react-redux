import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/trivia';
import Header from '../components/Header';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      disabled: false,
    };
    this.mainReder = this.mainRender.bind(this);
    this.disabledAnswers = this.disabledAnswers.bind(this);
  }

  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  disabledAnswers() {
    const { disabled } = this.state;
    this.setState({
      disabled: true,
    });
  }

  mainRender() {
    const { questionNumber, disabled } = this.state;
    const { questions } = this.props;
    const dorEsofrimento = questions.results;
    const question = dorEsofrimento[questionNumber];
    return (
      <main>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        {question.incorrect_answers.map((key, index) => (
          <button
            disabled={ disabled }
            data-testid={ `wrong-answer-${index}` }
            key={ key }
            type="button"
          >
            {key}

          </button>
        ))}
        <button
          disabled={ disabled }
          data-testid="correct-answer"
          type="button"
          onClick={ this.disabledAnswers }
        >
          {question.correct_answer}

        </button>
      </main>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        <Header />
        <div>
          {(loading) ? <p>loading..</p> : this.mainRender()}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetch: (value) => dispatch(fetchQuestions(value)),
});

const mapStateToProps = (state) => ({
  questions: state.question.allQuestions,
  loading: state.question.loading,
});

Questions.propTypes = {
  fetch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

// //0:
// category: "General Knowledge"
// correct_answer: "Ed Sheeran - I See Fire"
// difficulty: "hard"
// incorrect_answers: (3) ["Marvin Gaye - Sexual Healing", "Coldplay - Midnight", "a-ha - Take On Me"]
// question: "Electronic music producer Kygo&#039;s popularity skyrocketed after a certain remix. Which song did he remix?"
// type: "multiple"

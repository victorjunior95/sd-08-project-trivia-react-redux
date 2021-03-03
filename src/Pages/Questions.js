import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/trivia';
import Header from '../components/Header';
import '../App.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      disabled: false,
      invisible: true,
    };
    this.mainReder = this.mainRender.bind(this);
    this.disabledAnswers = this.disabledAnswers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  disabledAnswers() {
    this.setState({
      disabled: true,
      invisible: false,
    });
  }

  nextQuestion() {
    const { questionNumber } = this.state;
    this.setState({
      questionNumber: questionNumber + 1,
      disabled: false,
      invisible: true,
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
          onClick={ this.disabledAnswers }
        >
          {question.correct_answer}

        </button>
      </main>
    );
  }

  render() {
    const { invisible } = this.state;
    const { loading } = this.props;
    return (
      <div>
        <Header />
        <div>
          {(loading) ? <p>loading..</p> : this.mainRender()}
        </div>
        <button
          onClick={ this.nextQuestion }
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

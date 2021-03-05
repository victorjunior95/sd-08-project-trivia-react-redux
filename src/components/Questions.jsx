import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiGetQuestion } from '../Redux/actions';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
    };
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  renderQuestion() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    // console.log(questions);
    const result = questions.results;
    const question = result[questionIndex];
    console.log(questionIndex);
    return (
      <div>
        <h3 data-testid="question-category">
          Categoria:
          { question.category }
        </h3>
        <div>
          <h4>Pergunta</h4>
          <p data-testid="question-text">{ question.question }</p>
        </div>
        <div>
          <h5>Opções</h5>
          <button
            type="submit"
            data-testid="correct-answer"
          >
            { question.correct_answer }
          </button>
          { question.incorrect_answers
            .map((text, index) => (
              <button
                key={ index }
                type="submit"
                data-testid={ `wrong_answer-${index}` }
              >
                {text}
              </button>))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={ () => { this.renderQuestion(); } }
        >
          Mostrar pergnta
        </button>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestion: (value) => dispatch(apiGetQuestion(value)),
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

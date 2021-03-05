import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiGetQuestion } from '../Redux/actions';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    };
  }

  render() {
    const { questions } = this.props;
    const { questionIndex } = this.state;

    console.log(questions);
    console.log(questions.results);
    console.log(questions.results[questionIndex]);
    // console.log(questions.results[questionIndex].category);

    if (questions.isLoading) {
      return (
        <h3>Gerando Perguntas...</h3>
      );
    }
    return (
      <div>
        <h3 data-testid="question-category">
          Categoria:
          { questions.results[questionIndex].category }
        </h3>
        <div>
          <h4>Pergunta</h4>
          <p data-testid="question-text">{ questions.results[questionIndex].question }</p>
        </div>
        <div>
          <h5>Opções</h5>
          <button
            type="button"
            data-testid="correct-answer"
          >
            { questions.results[questionIndex].correct_answer }
          </button>
          { questions.results[questionIndex].incorrect_answers.map((text, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              {text}
            </button>))}
        </div>
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

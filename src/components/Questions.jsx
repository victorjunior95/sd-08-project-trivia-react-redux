import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiGetQuestion } from '../Redux/actions';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      question: '',
    };
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  renderQuestion() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    const result = questions.results;
    this.setState({
      question: result[questionIndex],
    });
  }

  render() {
    const { question } = this.state;

    return (
      <div>
        <button
          type="button"
          onClick={ () => { this.renderQuestion(); } }
        >
          Mostrar pergunta
        </button>

        { question
          ? <>
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
                type="button"
                data-testid="correct-answer"
              >
                { question.correct_answer }
              </button>
              { question.incorrect_answers.map((text, index) => (
                <button
                  key={ index }
                  type="button"
                  data-testid={ `wrong_answer-${index}` }
                >
                  {text}
                </button>))}
            </div>
          </>
          : ''}
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

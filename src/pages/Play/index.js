import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import unitedArray from '../../services/unitedArray';
import './styles.css';

class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
      isChange: false,
    };

    this.ramdomizeAnswers = this.ramdomizeAnswers.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  handleClickAnswer() {
    this.setState({ isChange: true });
  }

  // função tirada do link: http://cangaceirojavascript.com.br/como-embaralhar-arrays-algoritmo-fisher-yates/
  ramdomizeAnswers(answers) {
    for (let index = answers.length; index; index -= 1) {
      const randomIndex = Math.floor(Math.random() * index);
      const element = answers[index - 1];
      answers[index - 1] = answers[randomIndex];
      answers[randomIndex] = element;
    }
  }

  renderAnswers(data, isChange) {
    const scrambledArray = unitedArray(data) || [];
    this.ramdomizeAnswers(scrambledArray);
    let indexWrong = 0;
    return (scrambledArray.map((item, key) => {
      const { answer, flag } = item;
      const dataTest = flag ? 'correct-answer' : `wrong-answer-${indexWrong}`;
      indexWrong = flag ? indexWrong : (indexWrong += 1);
      return (
        <button
          type="button"
          key={ key }
          data-testid={ dataTest }
          disabled={ isChange }
          className={ isChange ? dataTest : 'answer' }
          onClick={ () => this.handleClickAnswer() }
        >
          {answer}
        </button>
      );
    }));
  }

  renderQuestions() {
    const { data } = this.props;
    console.log(data);
    const { indexQuestion, isChange } = this.state;
    if (!data) return (<div> Loading...</div>);
    return (
      <div className="container">
        <span data-testid="question-category">
          {
            data && data[indexQuestion].category
          }
        </span>

        <div className="container-question-answers">
          <div className="question">
            <p data-testid="question-text">
              {
                data && data[indexQuestion].question
              }
            </p>
          </div>
          <div className="answers">
            {this.renderAnswers(data[indexQuestion], isChange)}
          </div>
        </div>
      </div>
    );
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
};

const mapStateToProps = (state) => ({
  data: state.questions.data.results,
});

export default connect(mapStateToProps)(Play);

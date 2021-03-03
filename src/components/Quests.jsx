import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Quests extends React.Component {
  constructor() {
    super();

    this.state = {
      questNumber: 0,
      disableBtn: false,
    };

    this.handleAnswers = this.handleAnswers.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.encodeUtf8 = this.encodeUtf8.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickAnswers = this.handleClickAnswers.bind(this);
    this.createNextBtn = this.createNextBtn.bind(this);
  }

  handleAnswers(correct, incorrect) {
    const correctAnswer = [{ answer: correct, dataTest: 'correct-answer' }];
    const incorrectAnswer = incorrect
      .map((e, i) => ({ answer: e, dataTest: `wrong-answer-${i}` }));

    const answers = [...correctAnswer, ...incorrectAnswer];
    return answers;
  }

  shuffleAnswers(answers) {
    // função adaptada de "https://stackoverflow.com/users/464744/blender"
    for (let j, x, i = answers.length;
      i;
      j = parseInt(Math.random() * i, 10),
      x = answers[i -= 1],
      answers[i] = answers[j],
      answers[j] = x);
    return answers;
  }

  encodeUtf8(s) {
    const stringUTF = unescape(encodeURIComponent(s));
    return stringUTF.replace(/&quot;|&#039;/gi, '\'');
  }

  handleClickNext() {
    const { questions } = this.props;
    const { questNumber } = this.state;
    let num;
    if (questNumber < questions.length) {
      num = questNumber + 1;
    } else { num = 0; }
    this.setState(() => ({
      questNumber: num,
      disableBtn: false,
    }));
  }

  handleClickAnswers() {
    this.setState({
      disableBtn: true,
    });
  }

  createNextBtn() {
    const { disableBtn } = this.state;
    if (disableBtn) {
      return (
        <button
          type="button"
          onClick={ () => this.handleClickNext() }
          data-testid="btn-next"
        >
          PRÓXIMA
        </button>
      );
    }
  }

  render() {
    const { questions } = this.props;
    if (questions.length > 0) {
      const { questNumber, disableBtn } = this.state;
      const answers = this.handleAnswers(
        questions[questNumber].correct_answer, questions[questNumber].incorrect_answers,
      );
      const random = this.shuffleAnswers(answers);
      return (
        <div>
          <h2 data-testid="question-category">
            Categoria:
            { questions[questNumber].category }
          </h2>
          <h2 data-testid="question-text">
            { this.encodeUtf8(questions[questNumber].question) }
          </h2>

          {random.map((e, i) => (
            <button
              key={ i }
              type="button"
              data-testid={ e.dataTest }
              disabled={ disableBtn }
              onClick={ () => this.handleClickAnswers() }
              className={ e.dataTest.replace(/-[0-9]/i, '') }
            >
              { this.encodeUtf8(e.answer) }
            </button>
          )) }
          { this.createNextBtn() }
        </div>
      );
    }
    return (<span>Loading</span>);
  }
}

Quests.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
};
Quests.defaultProps = {
  questions: [],
};
const mapStateToProps = (state) => ({
  questions: state.questions.results,
});

export default connect(mapStateToProps)(Quests);

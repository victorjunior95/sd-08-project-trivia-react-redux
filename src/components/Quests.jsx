import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateScore } from '../redux/actions';

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
    this.saveScore = this.saveScore.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('score', 0);
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

  saveScore(timer, diff, score) {
    const { scoreRedux } = this.props;
    const SUM_TEN = 10;
    let savedScore = localStorage.getItem('score');
    if (savedScore === null) savedScore = score;

    const POINTS_HARD = 3;
    const POINTS_MEDIUM = 2;

    if (diff === 'hard') {
      const calc = SUM_TEN + (timer * POINTS_HARD);
      localStorage.setItem('score', calc + Number(savedScore));
    } else if (diff === 'medium') {
      const calc = SUM_TEN + (timer * POINTS_MEDIUM);
      localStorage.setItem('score', calc + Number(savedScore));
    } else {
      const calc = SUM_TEN + timer;
      localStorage.setItem('score', calc + Number(savedScore));
    }
    const setScore = localStorage.getItem('score');
    scoreRedux(setScore);
  }

  handleClickAnswers(answer, diff) {
    this.setState({
      disableBtn: true,
    });
    if (answer === 'correct-answer') this.saveScore(2, diff);
  }

  render() {
    const { questions, score } = this.props;
    console.log(score);
    if (questions.length > 0) {
      const { questNumber, disableBtn } = this.state;
      const answers = this.handleAnswers(
        questions[questNumber].correct_answer, questions[questNumber].incorrect_answers,
      );
      const random = this.shuffleAnswers(answers);
      const diff = questions[questNumber].difficulty;
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
              onClick={ () => this.handleClickAnswers(e.dataTest, diff, score) }
              className={ e.dataTest.replace(/-[0-9]/i, '') }
            >
              { this.encodeUtf8(e.answer) }
            </button>
          )) }
          <button type="button" onClick={ () => this.handleClickNext() }>PRÓXIMA</button>
        </div>
      );
    }
    return (<span>Loading</span>);
  }
}

Quests.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  score: PropTypes.number,
  scoreRedux: PropTypes.func.isRequired,
};
Quests.defaultProps = {
  questions: [],
  score: 0,
};
const mapStateToProps = (state) => ({
  questions: state.questions.results,
  score: state.update.score,
});

const mapDispatchToProps = (dispatch) => ({
  scoreRedux: (score) => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quests);
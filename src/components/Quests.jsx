import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';
import { updateScore } from '../redux/actions';

class Quests extends React.Component {
  constructor() {
    super();

    this.state = {
      questNumber: 0,
      disableBtn: false,
      timer: 30,
      stopTimer: false,
    };

    this.encodeUtf8 = this.encodeUtf8.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickAnswers = this.handleClickAnswers.bind(this);
    this.timeChange = this.timeChange.bind(this);
    this.createNextBtn = this.createNextBtn.bind(this);
    this.saveScore = this.saveScore.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('score', 0);
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
      timer: 30,
      stopTimer: false,
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
      stopTimer: true,
    });
    if (answer === 'correct-answer') this.saveScore(2, diff);
  }

  timeChange() {
    const { timer } = this.state;
    this.setState({ timer: timer - 1 });
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
    const { questions, score } = this.props;
    if (questions.length > 0) {
      const { questNumber, disableBtn, timer, stopTimer } = this.state;
      const random = questions[questNumber].allAnswersRandom;
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
          <Timer
            timer={ timer }
            timeChange={ this.timeChange }
            stopTimer={ stopTimer }
            handleClickAnswers={ this.handleClickAnswers }
          />
          { this.createNextBtn() }
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

// resolved conflict

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
      answerIsClicked: false,
      score: 0,
    };

    this.ramdomizeAnswers = this.ramdomizeAnswers.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.redirectTofeedBack = this.redirectTofeedBack.bind(this);
    this.handleClickNextButton = this.handleClickNextButton.bind(this);
    this.calculateQuestionStore = this.calculateQuestionStore.bind(this);
    this.sumScore = this.sumScore.bind(this);
    this.saveScoreInLocalStorage = this.saveScoreInLocalStorage.bind(this);
  }

  componentDidMount() {
    this.saveScoreInLocalStorage();
  }

  componentDidUpdate() {
    this.saveScoreInLocalStorage();
  }

  saveScoreInLocalStorage() {
    const { score } = this.state;
    const toSave = { player: {
      name: '',
      assertions: '',
      score,
      gravatarEmail: '',
    },
    };
    localStorage.setItem('state', JSON.stringify(toSave));
  }

  changeQuestion() {
    console.log('changeQuestion');
    this.setState((prevState) => ({
      indexQuestion: prevState.indexQuestion + 1,
      answerIsClicked: false,
    }));
  }

  redirectTofeedBack() {
    const { history } = this.props;
    history.push('/feedback');
  }

  handleClickNextButton() {
    console.log('handleClickNextButton');
    const FOUR = 4;
    const { indexQuestion } = this.state;
    if (indexQuestion < FOUR) {
      this.changeQuestion();
    } else {
      this.redirectTofeedBack();
    }
  }

  calculateQuestionStore() {
    const TEN = 10;
    const THREE = 3;
    const TWO = 2;
    const ONE = 1;
    const { data } = this.props;
    const { indexQuestion } = this.state;
    const difficulty = data[indexQuestion];
    // Aqui levará o resultado do timer
    let levelDifficulty;
    switch (difficulty) {
    case 'hard':
      levelDifficulty = THREE;
      break;
    case 'medium':
      levelDifficulty = TWO;
      break;
    default:
      levelDifficulty = ONE;
      break;
    }
    const timer = 15;
    const result = TEN + (timer * levelDifficulty);
    console.log(result);
    return result;
  }

  sumScore(event) {
    const dataTestIs = event.target.getAttribute('data-testid');
    if (dataTestIs === 'correct-answer') {
      console.log(event.target.class);
      this.setState((prevState) => ({
        score: prevState.score + this.calculateQuestionStore(),
      }));
    }
  }

  handleClickAnswer(event, callback) {
    this.setState(() => ({ answerIsClicked: true }), callback(event));
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

  renderNextButton() {
    const { answerIsClicked } = this.state;
    if (answerIsClicked) {
      return (
        <div>
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleClickNextButton }
          >
            Próxima
          </button>
        </div>
      );
    }
  }

  renderAnswers(data, answerIsClicked) {
    const scrambledArray = unitedArray(data) || [];
    this.ramdomizeAnswers(scrambledArray);
    let indexWrong = 0;
    return (scrambledArray.map((item, key) => {
      const { answer, flag } = item;
      const dataTest = flag ? 'correct-answer' : `wrong-answer-${indexWrong}`;
      indexWrong = flag ? indexWrong : (indexWrong += 1);
      return (
        <button
          key={ key }
          type="button"
          data-testid={ dataTest }
          disabled={ answerIsClicked }
          className={ answerIsClicked ? dataTest : 'answer' }
          onClick={ (event) => this.handleClickAnswer(event, () => this.sumScore(event)) }
        >
          {answer}
        </button>
      );
    }));
  }

  renderQuestions() {
    const { data } = this.props;
    console.log(data);
    const { indexQuestion, answerIsClicked } = this.state;
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
            {this.renderAnswers(data[indexQuestion], answerIsClicked)}
          </div>
        </div>
        <div>
          {this.renderNextButton()}
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
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  data: state.questions.data.results,
});

export default connect(mapStateToProps)(Play);

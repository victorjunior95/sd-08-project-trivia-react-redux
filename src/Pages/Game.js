import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Header from '../components/Header';

import { triviaAPI, increaseScore } from '../redux/actions';

import '../styles/game.css';

const TOTAL_QUESTIONS = 5;
const HARD_QUESTION_DIFFICULTY = 3;
const MEDIUM_QUESTION_DIFFICULTY = 2;
const EASY_QUESTION_DIFFICULTY = 1;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      timer: null,
      // score: 0,
      buttonClass: false,
      click: 0,
      disabled: false,
      nextButtonEnabled: false,
      // time: {},
    };
    // this.interval = null;
    // this.setTimer = this.setTimer.bind(this);
    this.setScore = this.setScore.bind(this);
    this.saveScore = this.saveScore.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleButtonClass = this.handleButtonClass.bind(this);
    // this.nextQuestion = this.nextQuestion.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  // Faz parte da primeira lógica de timer
  componentDidMount() {
    // const miliseconds = 1000;
    // setInterval(this.setTimer, miliseconds);
    this.saveScore();
    this.fetchAPI();
  }

  // componentDidUpdate() {
  //   this.setTimer();
  // }

  // componentWillUnmount() {
  //   this.clearInterval(this.state.timer);
  // }

  // setTimer() {
  // Pensei dois jeitos diferentes, então poderemos escolher qual melhor se adequa.
  // Lógica 01
  // const { timer } = this.state;
  // if (timer > 0) {
  //   this.setState((previous) => ({
  //     ...previous,
  //     timer: previous.timer - 1,
  //   }));
  // } else {
  //   this.setState({
  //     timer: 0,
  //     disabled: true,
  //     nextButtonEnabled: true,
  //   });
  // const countdownTimer = Date.now() + 30000;
  // this.interval = setInterval(() => {
  //   const now = new Date();
  //   const distance = countdownTimer - now;
  //   const seconds = Math.floor((distance % 100 (1000 * 60)) / 1000);
  //   if (distance < 0) {
  //     clearInterval(this.interval);
  //     this.setState({
  //       timer: {
  //         seconds: 0
  //       },
  //       disabled: true,
  //       nextButtonEnabled: true,
  //     });
  //   } else {
  //     this.setState({
  //       timer: {
  //         seconds
  //       }
  //     });
  //   }
  // }, 1000);
  // }
  // Lógica 02
  // const countdownTimer = Date.now() + 30000;
  // this.interval = setInterval(() => {
  //   const now = new Date();
  //   const distance = countdownTimer - now;
  //   const seconds = Math.floor((distance % 100 (1000 * 60)) / 1000);

  //   if (distance < 0) {
  //     clearInterval(this.interval);
  //     this.setState({
  //       time: {
  //         seconds: 0
  //       },
  //       disabled: true
  //     });
  //   } else {
  //     this.setState({
  //       time: {
  //         seconds
  //       }
  //     });
  //   }
  // }, 1000);

  setScore(userAnswer) {
    const { timer, count } = this.state;
    const { questions, dispatchScore } = this.props;

    const { difficulty } = questions[count];
    let scoreByDifficulty = 0;
    const fixedScore = 10;

    if (difficulty === 'easy') scoreByDifficulty = EASY_QUESTION_DIFFICULTY;
    if (difficulty === 'medium') scoreByDifficulty = MEDIUM_QUESTION_DIFFICULTY;
    if (difficulty === 'hard') scoreByDifficulty = HARD_QUESTION_DIFFICULTY;

    const score = (fixedScore + (timer * scoreByDifficulty));

    if (userAnswer === 'correct') {
      this.saveScore(score);
      dispatchScore(score);
    }
  }

  saveScore() {
    // pegar dados da jogada e do jogador em localstorage via props
    // onde playerGame vai ser um objeto com os dados trazidos
    localStorage.setItem('state', '10');
    // JSON.stringify(playerGame)
  }

  handleClick() {
    this.setState((previousState) => ({
      count: previousState.count + 1,
      timer: 30,
      buttonClass: false,
      nextButtonEnabled: false,
      click: previousState.click + 1,
    }));
  }

  handleButtonClass({ target }) {
    this.setState({
      buttonClass: true,
      nextButtonEnabled: true,
    }, () => {
      const btnClass = target.className;
      this.setScore(btnClass);
    });
  }

  // nextQuestion() {
  //   const nextQuestion = number + 1;
  //   if (nextQuestion === TOTAL_QUESTIONS) {
  //     endGame(true);
  //   } else {
  //     setNumber(nextQuestion);
  //   }
  // };

  endGame() {
    const { click } = this.state;
    const { history } = this.props;
    const nextQuestion = click + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      history.push('/feedback');
    }
  }

  fetchAPI() {
    const { dispatchQuestions } = this.props;
    const token = localStorage.getItem('token');
    dispatchQuestions(token);
  }

  render() {
    const {
      count,
      timer,
      // score,
      buttonClass,
      // click,
      disabled,
      nextButtonEnabled,
    } = this.state;
    const { success, questions } = this.props;
    console.log(questions);

    let correctAnswer = '';
    let options = '';

    if (success === true) {
      correctAnswer = questions[count].correct_answer;
      options = [...questions[count].incorrect_answers, correctAnswer].sort();
    }

    return (
      <main>
        {/* <Header />
        {
          !this.endGame
            ? (
              <p className="score">
                Score:
                {score}
              </p>) : null
        } */}

        <span>{timer}</span>
        {/* <span> {time.seconds} </span> */}

        {/* {loading ? <p>Loading...</p> : null} */}

        { success ? (
          <section>
            <h2 data-testid="question-category">
              { questions[count].category }
            </h2>

            <p data-testid="question-text">
              { questions[count].question }
            </p>

            {options.map((option, index) => (
              <section key={ index }>
                <button
                  type="button"
                  data-testid={ option === correctAnswer ? 'correct-answer'
                    : `wrong-answer${index}` }
                  disabled={ disabled }
                  onClick={ (event) => {
                    this.handleButtonClass(event);
                  } }
                  className={ option === correctAnswer ? `${buttonClass ? 'correct' : ''}`
                    : `${buttonClass ? 'wrong' : ''}` }
                >
                  {option}
                </button>
              </section>
            ))}

            {/* {!endGame && !loading && userAnswers.length ===
              click + 1 && click !== TOTAL_QUESTIONS - 1 ? () } */}
            {nextButtonEnabled ? (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ () => {
                  this.handleClick();
                  this.endGame();
                } }
              >
                Próxima
              </button>
            ) : null }
          </section>
        ) : <span>Loading...</span>}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  success: state.triviaReducer.success,
  questions: state.triviaReducer.questions.results,
  // score: state.localStorage.score,
});

const mapDispacthToProps = (dispatch) => ({
  dispatchQuestions: (token) => dispatch(triviaAPI(token)),
  dispatchScore: (score) => dispatch(increaseScore(score)),
});

export default connect(mapStateToProps, mapDispacthToProps)(Game);

Game.propTypes = {
  questions: PropTypes.string.isRequired,
  dispatchScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  success: PropTypes.bool.isRequired,
  dispatchQuestions: PropTypes.func.isRequired,
};

/*
materiais consultados
  https://github.com/jamesqquick/Build-A-Quiz-App-With-HTML-CSS-and-JavaScript
  https://github.com/ruvictor/quizz-react
  https://github.com/cfleschhut/react-redux-trivia-quiz-game
  https://github.com/jriall/react-redux-quiz-app
  https://github.com/weibenfalk/react-quiz
  https://www.youtube.com/watch?v=tEefDoWz0PI&list=PLEVTJcDnFDm9lpEEHTftRa9JSRV4jY_p9&index=21
*/

// const App: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [questions, setQuestions] = useState<QuestionsState[]>([]);
//   const [number, setNumber] = useState(0);
//   const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(true);

//   const checkAnswer = (e: any) => {
//     if (!gameOver) {
//       // User's answer
//       const answer = e.currentTarget.value;
//       // Check answer against correct answer
//       const correct = questions[number].correct_answer === answer;
//       // Add score if answer is correct
//       if (correct) setScore((prev) => prev + 1);
//       // Save the answer in the array for user answers
//       const answerObject = {
//         question: questions[number].question,
//         answer,
//         correct,
//         correctAnswer: questions[number].correct_answer,
//       };
//       setUserAnswers((prev) => [...prev, answerObject]);
//     }
//   };

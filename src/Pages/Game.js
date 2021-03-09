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
      counter: 30,
      buttonClass: false,
      click: 0,
      disabled: false,
      nextButtonEnabled: false,
      questionAnswered: false,
      // time: {},
    };
    // this.interval = null;
    this.timer = this.timer.bind(this);
    this.setScore = this.setScore.bind(this);
    this.saveScore = this.saveScore.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleButtonClass = this.handleButtonClass.bind(this);
    // this.nextQuestion = this.nextQuestion.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  // Faz parte da primeira lógica de timer
  componentDidMount() {
    this.timer();
    this.saveScore();
    this.fetchAPI();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  setScore(userAnswer) {
    const { counter, count } = this.state;
    const { questions, dispatchScore } = this.props;

    const { difficulty } = questions[count];
    let scoreByDifficulty = 0;
    const fixedScore = 10;

    if (difficulty === 'easy') scoreByDifficulty = EASY_QUESTION_DIFFICULTY;
    if (difficulty === 'medium') scoreByDifficulty = MEDIUM_QUESTION_DIFFICULTY;
    if (difficulty === 'hard') scoreByDifficulty = HARD_QUESTION_DIFFICULTY;

    const score = (fixedScore + (counter * scoreByDifficulty));

    if (userAnswer === 'correct') {
      this.saveScore(score);
      dispatchScore(score);
    }
  }

  timer() {
    this.myInterval = setInterval(() => {
      const { questionAnswered, counter } = this.state;
      if (questionAnswered === false && counter > 0) {
        this.setState({
          counter: counter - 1,
        });
      } else {
        this.setState({
          buttonClass: true,
          disabled: true,
          nextButtonEnabled: true,
        });
        this.setScore('incorrect');
      }
    }, 1000);
  }

  saveScore(score) {
    const playerLocalStorage = JSON.parse(localStorage.getItem('player'));
    const player = {
      ...playerLocalStorage,
      score: playerLocalStorage.score + score,
    };
    localStorage.setItem('player', JSON.stringify(player));
  }

  handleClick() {
    this.setState((previousState) => ({
      count: previousState.count + 1,
      counter: 30,
      buttonClass: false,
      nextButtonEnabled: false,
      questionAnswered: false,
      disabled: false,
      click: previousState.click + 1,
    }));
  }

  handleButtonClass({ target }) {
    this.setState({
      buttonClass: true,
      nextButtonEnabled: true,
      questionAnswered: true,
    }, () => {
      const btnClass = target.className;
      console.log(target.className);
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
      counter,
      // score,
      buttonClass,
      // click,
      disabled,
      nextButtonEnabled,
    } = this.state;
    const { success, questions } = this.props;

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

        <span>{counter}</span>
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

Game.propTypes = {
  questions: PropTypes.string.isRequired,
  dispatchScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  success: PropTypes.bool.isRequired,
  dispatchQuestions: PropTypes.func.isRequired,
};

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

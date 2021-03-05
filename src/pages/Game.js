import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

// import { changeState } from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      number: 0,
      timer: 30,
    };

    this.renderizaQuestion = this.renderizaQuestion.bind(this);
    this.cronometro = this.cronometro.bind(this);
  }

  componentDidMount() {
    const seg = 1000;
    setInterval(this.cronometro, seg);
  }

  cronometro() {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState((anterior) => ({
        ...anterior,
        timer: anterior.timer - 1,
      }));
    } else {
      this.setState({
        timer: 0,
        travar: true,
      });
    }
  }

  renderizaQuestion() {
    const { questions, wrongAnswers,
      correctsAnswers, categories } = this.props;
    const { number, travar, timer } = this.state;

    const { green, red } = this.state;
    const question1 = questions[number];
    const answer = correctsAnswers[0];
    const wrongs = wrongAnswers[0];
    const category = categories[0];
    return (
      <div>
        <div>{timer}</div>
        <h2 data-testid="question-category">
          {' '}
          Categoria :
          {' '}
          {category}

        </h2>
        <h1 data-testid="question-text">{question1}</h1>

        <button
          type="button"
          disabled={ travar }
          onClick={ () => {
            this.setState({ green: 'green',
              red: 'red' });
          } }
          data-testid="correct-answer"
          className={ green }
        >
          {answer}

        </button>

        {wrongs && wrongs.map((item, index) => (
          <button
            type="button"
            key={ item }
            data-testid={ `wrong-answer-${index}` }
            className={ red }
            onClick={ () => {
              this.setState({ green: 'green',
                red: 'red' });
            } }
          >
            {item}
          </button>
        ))}
        <button type="button" onClick={ this.clicar }>Próxima</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderizaQuestion()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  correctsAnswers: state.login.userr.correctsAnswers,
  wrongAnswers: state.login.userr.wrongAnswers,
  categories: state.login.userr.categories,
  questions: state.login.userr.questions,
});

Game.propTypes = {
  questions: PropTypes.shape.isRequired,
  wrongAnswers: PropTypes.shape.isRequired,
  categories: PropTypes.shape.isRequired,
  correctsAnswers: PropTypes.shape.isRequired,
};
export default connect(mapStateToProps)(Game);

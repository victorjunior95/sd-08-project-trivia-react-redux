import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateScoreAction } from '../actions';

const HALF_SHUFFLE = 0.5;
const CONST_INIT = 10;
const THREE = 3;
class CardQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ask: 0,
      disabled: false,
      timer: 30,
      assertions: 0,
      answer: '',
      response: '',
    };
    this.onclick = this.onclick.bind(this);
  }

  componentDidMount() {
    const player = JSON.stringify({
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
      answer: '',
    });
    return (
      localStorage.setItem('player', player)
    );
  }

  onclick(answerUser) {
    this.setState({ disabled: true });
    const { timer, ask, assertions, answer } = this.state;
    const { updateScore, questionCard } = this.props;
    let { score } = this.props;

    let player = JSON.parse(localStorage.getItem('player'));
    const { name, gravatarEmail } = player;

    if (answerUser === answer) {
      score += CONST_INIT + (timer * this.difficulty(questionCard[ask].difficulty));
    }

    player = JSON.stringify({ name, assertions, score, gravatarEmail });
    updateScore(score);
    return (
      localStorage.setItem('player', player)
    );
  }

  difficulty(dificuldade) {
    if (dificuldade === 'easy') {
      return 1;
    }
    if (dificuldade === 'medium') {
      return 2;
    }
    return THREE;
  }

  decode(texto) {
    const txt = document.createElement('textarea');
    txt.innerHTML = texto;
    return txt.value;
  }

  styleOnclick(response, answer, element) {
    if (!response) {
      return { border: 'null' };
    } else if (element === answer) {
      return { border: '3px solid rgb(6, 240, 15)' }
    }
    return { border: '3px solid rgb(255, 0, 0)' };
  }

  render() {
    const { questionCard } = this.props;
    const { ask, disabled, answer, response } = this.state;
    return (
      <div>
        { questionCard.length > 0
          && (
            <div>
              <h3 data-testid="question-category">{ questionCard[ask].category }</h3>
              <p data-testid="question-text">
                { this.decode(questionCard[ask].question) }
              </p>
              <div>
                { [...questionCard[ask].incorrect_answers,
                  questionCard[ask].correct_answer].map((element, index) => {
                  const dataId = () => (element === questionCard[ask].correct_answer
                    ? 'correct-answer' : `wrong-answer-${index}`);
                  return (
                    <button
                      type="button"
                      onClick={ (e) => {
                        this.setState({
                          answer: questionCard[ask].correct_answer,
                          response: e.target.value,
                        }, () => this.onclick(element));
                      } }

                      value={ element }
                      disabled={ disabled }
                      data-testid={ dataId() }
                      key={ element }
                      style={ this.styleOnclick(response, answer, element) }
                    >
                      { this.decode(element) }
                    </button>
                  );
                }).sort(() => Math.random() - HALF_SHUFFLE) }
              </div>
              <button
                type="button"
                onClick={ () => this.setState(
                  { ask: ask + 1, disabled: false, response: '' }
                ) }
              >
                Next
              </button>
            </div>)}
      </div>
    );
  }
}

CardQuestions.propTypes = {
  questionCard: PropTypes.arrayOf(PropTypes.object).isRequired,
  score: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(updateScoreAction(score)),
});

const mapStateToProps = (state) => ({
  questionCard: state.play.questions,
  score: state.play.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(CardQuestions);

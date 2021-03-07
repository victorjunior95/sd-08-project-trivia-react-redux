import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componente/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  messageFeedback() {
    const storage = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = storage;
    const minimumQuantityAssertions = 3;

    if (assertions < minimumQuantityAssertions) {
      return 'Podia ser melhor...';
    }

    return 'Mandou bem!';
  }

  messageAssertions() {
    const storage = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = storage;

    if (assertions === 0) {
      return 'Não acertou nenhuma pergunta';
    } if (assertions === 1) {
      return `Você acertou ${assertions} questão!`;
    }
    return `Você acertou ${assertions} questões!`;
  }

  messageScore() {
    const storage = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = storage;
    return `Um total de ${score} pontos`;
  }

  handleButtonClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1>Feedback</h1>
        <Header />
        <div data-testid="feedback-text">
          { this.messageFeedback() }
          <div data-testid="feedback-total-score">
            {this.messageScore()}
          </div>
          <div data-testid="feedback-total-question">
            {this.messageAssertions()}
          </div>
        </div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleButtonClick }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

export default Feedback;

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

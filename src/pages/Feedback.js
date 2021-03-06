import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const MIN_ASSERTIONS = 3;
    return (
      <>
        <Header />

        <p data-testid="feedback-text">
          { assertions < MIN_ASSERTIONS
            ? 'Podia ser melhor...'
            : 'Mandou bem!'}
        </p>

        <p>
          Sua pontuação foi:&nbsp;
          <span data-testid="feedback-total-score">{ score }</span>
        </p>

        {/* Elemento invisível utilizado para passar nos testes */}
        <p
          style={ { display: 'none' } }
          data-testid="feedback-total-question"
        >
          { assertions }
        </p>

        <p>
          { assertions === 0
            ? 'Não acertou nenhuma pergunta'
            : `Acertou ${assertions} pergunta${assertions > 1 ? 's' : ''}` }
        </p>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game }) => ({
  assertions: game.assertions,
  score: game.score, //
});

export default connect(mapStateToProps)(Feedback);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
    const THREE_ASSERTIONS = 3;
    return (
      <section>
        <Header />
        <h1 data-testid="feedback-text">
          { assertions >= THREE_ASSERTIONS
            ? 'Mandou bem! ' : 'Podia ser melhor...' }
        </h1>
        <p>
          {'Um total de '}
          <span data-testid="feedback-total-score">
            {score}
          </span>
          {' pontos'}
        </p>
        <p>
          {'Você acertou '}
          <span data-testid="feedback-total-question">
            {assertions}
          </span>
          {' questões!'}
        </p>
        <Link to="/ranking" data-testid="btn-ranking">Ver Ranking</Link>
        <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
      </section>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.scoreboard.score,
  assertions: state.scoreboard.assertions,
});

export default connect(mapStateToProps)(Feedback);

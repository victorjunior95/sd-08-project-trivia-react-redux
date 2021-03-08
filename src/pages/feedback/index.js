import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

class Feedback extends Component {
  // getRanking() {
  //   const jsonRanking = localStorage.getItem('ranking');
  // }

  saveRanking() {
    const { score, name, email } = this.props;
    const actualRankings = this.getRanking();
    const newPlayer = {
      name,
      score,
      email,
    };
    if (actualRankings.list.length >= 1) {
      const ranking = {
        ...actualRankings,
        newPlayer,
      };
      return localStorage.setItem('ranking', JSON.stringify(ranking));
    }
    const ranking = {
      list: [newPlayer],
    };
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { score, assertions } = this.props;
    const THREE_ASSERTIONS = 3;
    this.saveRanking();
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
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.scoreboard.score,
  assertions: state.scoreboard.assertions,
  name: state.user.name,
  email: state.user.email,
});

export default connect(mapStateToProps)(Feedback);

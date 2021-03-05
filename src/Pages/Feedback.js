import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

class Feedback extends Component {
  render() {
    const {
      name,
      assertions,
      score,
      email,
    } = this.props;
    const newPlayer = {
      name,
      assertions,
      score,
      gravatarEmail: email,
    };
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    const newRanking = [];
    if (rankingList !== null) newRanking.push(rankingList);
    newRanking.push(newPlayer);
    localStorage.setItem('ranking', JSON.stringify(newRanking));
    const cutOff = 3;
    return (
      <div>
        <Header />
        <div>
          <h1>RESULTADO</h1>
          {assertions >= cutOff
            ? <p data-testid="feedback-text">Mandou bem!</p>
            : <p data-testid="feedback-text">Podia ser melhor...</p>}
          <div data-testid="feedback-total-score">
            <p>Você acertou </p>
            { score }
            <p>questões</p>
          </div>
          <div data-testid="feedback-total-question">
            <p>Um total de </p>
            { assertions }
            <p>pontos</p>
          </div>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking">
              Ver Ranking
            </button>
          </Link>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">
              Jogar novamente
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.user.score,
  assertions: state.user.assertions,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);

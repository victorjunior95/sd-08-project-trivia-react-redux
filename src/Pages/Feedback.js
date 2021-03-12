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
      avatar,
    } = this.props;
    const newPlayer = {
      name,
      score,
      picture: avatar,
    };
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    let newRanking = [];
    if (rankingList !== null) {
      newRanking = rankingList;
    }
    newRanking.push(newPlayer);
    const rankingListOrdered = newRanking.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(rankingListOrdered));
    const cutOff = 3;
    return (
      <div>
        <Header />
        <div>
          <h1>RESULTADO</h1>
          {assertions >= cutOff
            ? <p data-testid="feedback-text">Mandou bem!</p>
            : <p data-testid="feedback-text">Podia ser melhor...</p>}
          <div>
            <p>Você acertou </p>
            <span data-testid="feedback-total-score">
              { score }
            </span>
            <p>questões</p>
          </div>
          <div>
            <p>Um total de </p>
            <span data-testid="feedback-total-question">
              { assertions }
            </span>
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
  avatar: state.user.avatar,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  avatar: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionReturnLogin } from '../redux/actions/index';

class Ranking extends Component {
  compare(a, b) {
    const NEGATIVE = -1;
    if (a.score > b.score) return NEGATIVE;
    if (b.score > a.score) return 1;
    return 0;
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = ranking.sort(this.compare);
    const { returnLogin } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {sortedRanking.map((player, index) => (
          <div key={ index }>
            <p
              key={ player.name }
              data-testid={ `player-name-${index}` }
            >
              NOME DO JOGADOR:
              {player.name}
            </p>
            <p
              key={ player.score }
              data-testid={ `player-score-${index}` }
            >
              PONTUAÇÃO:
              {player.score}
            </p>
            AVATAR
            <img
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${player.gravatarEmail}` }
              alt="perfil"
            />
          </div>
        ))}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => returnLogin() }
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  returnLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  returnLogin: () => dispatch(actionReturnLogin()),
});

export default connect(null, mapDispatchToProps)(Ranking);

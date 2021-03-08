import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionReturnLogin } from '../redux/actions/index';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { returnLogin } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map((player, index) => (
          <div key={ player }>
            <p
              key={ player.name }
              data-testid={ `player-name-${index}` }
            >
              {player.name}
            </p>
            <p
              key={ player.score }
              data-testid={ `player-score-${index}` }
            >
              {player.score}
            </p>
            <p key={ player.gravatarEmail }>{player.gravatarEmail}</p>
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

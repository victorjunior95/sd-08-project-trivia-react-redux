import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  resetGame as resetGameAction,
} from '../actions';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: false,
    };
  }

  componentDidMount() {
    this.updateRanking();
  }

  updateRanking() {
    const currentPlayerRecord = JSON.parse(localStorage.getItem('state'));
    const currentRanking = JSON.parse(localStorage.getItem('ranking')) || [];

    currentRanking.push({
      name: currentPlayerRecord.player.name,
      score: currentPlayerRecord.player.score,
      picture: currentPlayerRecord.player.gravatarEmail });

    currentRanking.sort((a, b) => b.score - a.score);

    localStorage.setItem('ranking', JSON.stringify(currentRanking));

    this.setState({
      ranking: true,
    });
  }

  renderRecordList() {
    const { ranking } = this.state;
    if (ranking) {
      return (
        <ol>
          { JSON.parse(localStorage.getItem('ranking'))
            .map((player, index) => (
              <li key={ index }>
                <img src={ player.picture } alt="Player Avatar" />
                <span data-testid={ `player-name-${index}` }>
                  { player.name }
                </span>
                <span data-testid={ `player-score-${index}` }>
                  { player.score }
                </span>
              </li>))}
        </ol>
      );
    }
  }

  render() {
    const { history, resetGame } = this.props;

    return (
      <>
        <h2 data-testid="ranking-title">Ranking</h2>
        { this.renderRecordList() }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => { resetGame(); history.push('/'); } }
        >
          Voltar ao Início
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(resetGameAction()),
});

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  resetGame: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);

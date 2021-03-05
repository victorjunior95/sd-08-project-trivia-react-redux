import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const rankingList = ranking.sort((score1, score2) => (
      Number(score2.score) - Number(score1.score)
    ));
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        { rankingList.map((player, index) => (
          <section key={ player }>
            {index + 1}
            <img src={ player.image } alt="player-img" />
            <div>
              Nome:
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              <br />
              Pontuação:
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </div>
          </section>
        ))}
        <Link to="/"><button data-testid="btn-go-home" type="button">Home</button></Link>
      </section>
    );
  }
}
/*
Ranking.propTypes = {};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
*/
export default connect(null, null)(Ranking);

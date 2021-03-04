import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  generateRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => b.score - a.score);
    return (
      ranking.map((e, index) => (
        <tr
          key={ index }
          role="row"
        >
          <td role="cell">
            <img src={ e.picture } alt="Gravatar" />
          </td>
          <td role="cell" data-testid={ `player-name-${index}` }>{e.name}</td>
          <td role="cell" data-testid={ `player-score-${index}` }>{e.score}</td>
        </tr>
      ))
    );
  }

  render() {
    return (
      <div>
        <h1 className="ranking" data-testid="ranking-title">Ranking</h1>
        <table>
          <tbody>
            <tr>
              <th>Foto</th>
              <th>Jogador</th>
              <th>Pontução</th>
            </tr>
            {this.generateRanking()}
          </tbody>
        </table>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {

//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {

//   };
// }

export default connect(
  null,
  null,
)(Ranking);

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Score extends Component {
  render() {
    const { difficulty, timer } = this.props;
    const difficultyLevel = { hard: 3, medium: 2, easy: 1 };
    const TEN = 10;
    const points = TEN + (timer * difficultyLevel[difficulty]);
    return (
      <div>
        <h2>{`Pontuação: ${points}`}</h2>
      </div>
    );
  }
}

Score.propTypes = {
  difficulty: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
};

export default Score;

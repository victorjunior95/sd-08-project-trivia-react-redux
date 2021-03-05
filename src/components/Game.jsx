import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Quests from './Quests';
import './css/Game.css';
import TopInfobar from './TopInfobar';

class Game extends React.Component {
  componentDidMount() {
    const { email, playerName, score } = this.props;
    const state = {
      player: {
        name: playerName,
        assertions: 0,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    return (
      <>
        <TopInfobar />
        <section className="game-question">
          <Quests />
        </section>
      </>
    );
  }
}

Game.propTypes = {
  email: PropTypes.string,
  playerName: PropTypes.string,
  score: PropTypes.number,
};

Game.defaultProps = {
  email: '',
  playerName: '',
  score: 0,
};

// const mapStateToProps = (state) => ({});
// const mapDispatchToProps = (dispatch) => ({});

export default connect(null, null)(Game);

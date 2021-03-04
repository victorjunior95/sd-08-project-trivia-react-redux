import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as GameActions } from '../store/ducks/game';

import Header from '../components/Header';
import TriviaQuestion from '../components/TriviaQuestion';

class Game extends Component {
  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  render() {
    return (
      <>
        <Header />
        <TriviaQuestion />
      </>
    );
  }
}

Game.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(GameActions, dispatch);

export default connect(null, mapDispatchToProps)(Game);

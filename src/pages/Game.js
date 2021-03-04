import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as GameActions } from '../store/ducks/game';

import Header from '../components/Header';
import Question from '../components/Question';

class Game extends Component {
  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  render() {
    return (
      <>
        <Header />
        <Question />
      </>
    );
  }
}

Game.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(GameActions, dispatch);

export default connect(null, mapDispatchToProps)(Game);

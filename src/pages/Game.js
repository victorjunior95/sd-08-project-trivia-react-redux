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
    const { nextQuestion, currentQuestionIndex } = this.props;
    return (
      <>
        <Header />
        <TriviaQuestion key={ currentQuestionIndex } />
        <button type="button" onClick={ nextQuestion }>Próxima</button>
      </>
    );
  }
}

Game.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game }) => ({
  currentQuestionIndex: game.currentQuestionIndex,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(GameActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Game);

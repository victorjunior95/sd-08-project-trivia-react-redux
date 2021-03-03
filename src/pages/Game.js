import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchQuestions } from '../actions/fetchQuestions';
import questions from '../reducers/questions';

class Game extends Component {
  render() {
    return (
      <form>
        <p data-testid="question-category">Categoria:</p>
        <p data-testid="question-text">Pergunta:</p>
        {/* {alternativas.map => } */}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});

export default connect(null)(Game);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions as fetchQuestionsThunk } from '../actions/fetchQuestions';

class Game extends Component {
  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  render() {
    const { questions } = this.props;
    return (
      <>
        <Header />
        <form>
          <p data-testid="question-category">Categoria:</p>
          <p data-testid="question-text">Pergunta:</p>
          <p>
            {Object.values(questions).map((question) => question.results)}

          </p>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestionsThunk()),
});

Game.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

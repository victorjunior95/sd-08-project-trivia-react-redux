import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import Questions from '../component/Questions';
import { fetchQuestions } from '../actions';
// import { Link } from 'react-router-dom';

class Game extends React.Component {
  componentDidMount() {
    const { fetchQuestionsAction } = this.props;
    fetchQuestionsAction();
  }

  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsAction: () => dispatch(fetchQuestions()),
});

Game.propTypes = {
  fetchQuestionsAction: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);

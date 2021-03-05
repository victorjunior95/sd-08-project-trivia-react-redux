import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionViewer from '../components/QuestionViewer';
import { fetchQuestions } from '../store/actions/questions.actions';
import Header from '../components/Header';

class Game extends React.Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    const token = localStorage.getItem('token');
    const numberOfQuestions = 5;
    getQuestions(numberOfQuestions, token);
  }

  render() {
    const { isFetching, token } = this.props;
    return (
      <>
        <Header />
        {!isFetching && token && <QuestionViewer />}
      </>
    );
  }
}

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isFetching: state.questions.isFetching,
  token: state.player.token,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

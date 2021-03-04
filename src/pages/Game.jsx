import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionViewer from '../components/QuestionViewer';
import { fetchQuestions } from '../store/actions/questions.actions';

class Game extends React.Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { isFetching } = this.props;
    return !isFetching && <QuestionViewer />;
  }
}

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isFetching: state.questions.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

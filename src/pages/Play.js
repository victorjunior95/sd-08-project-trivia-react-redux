import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiQuestions } from '../actions';
import CardQuestions from '../components/CardQuestions';
import { Header } from '../components';

class Play extends Component {
  componentDidMount() {
    const { token, questions } = this.props;
    questions(token);
  }

  render() {
    return (
      <div>
        <Header />
        <CardQuestions />
      </div>
    );
  }
}

Play.propTypes = {
  questions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  questions: (token) => dispatch(fetchApiQuestions(token)),
});

const mapStateToProps = (state) => ({
  token: state.play.token,
});
export default connect(mapStateToProps, mapDispatchToProps)(Play);

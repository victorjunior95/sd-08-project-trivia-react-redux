import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchAPI } from '../actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 0,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const { getQuestions } = this.props;
      await getQuestions(token);
    }
  }

  render() {
    const { results, redirect } = this.props;
    const { question } = this.state;
    const token = localStorage.getItem('token');

    if (redirect && !token) { return <Redirect to="/" />; }

    if (!results) {
      return (
        <article>
          <p>Carregando...</p>
        </article>
      );
    }

    return (
      <article>
        <h2 data-testid="">{ results[question].category }</h2>
      </article>
    );
  }
}

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  redirect: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchAPI(token)),
});

const mapStateToProps = (state) => ({
  results: state.trivia.data.results,
  redirect: !state.trivia.hasToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
